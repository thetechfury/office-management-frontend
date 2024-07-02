import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';


const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(credentials),

        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to login');
        const setCookieHeader = response.headers.get('set-cookie');
        console.log('Set-Cookie Header:', setCookieHeader);
        return {data, setCookieHeader};
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${BASE_URL}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user data');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = true; // Set user to true to indicate user is logged in
                localStorage.setItem('user', JSON.stringify(true));
                try {
                    let csrfToken = '';
                    let sessionId = '';
                    const setCookieHeader = action.payload.setCookieHeader;
                    const csrfMatch = setCookieHeader.match(/csrftoken=([^;]+)/);
                    if (csrfMatch && csrfMatch.length > 1) {
                        csrfToken = csrfMatch[1];
                    } else {
                        throw new Error('csrftoken not found in Set-Cookie header');
                    }
                    const sessionIdMatch = setCookieHeader.match(/sessionid=([^;]+)/);
                    if (sessionIdMatch && sessionIdMatch.length > 1) {
                        sessionId = sessionIdMatch[1];
                    } else {
                        throw new Error('sessionid not found in Set-Cookie header');
                    }
                    localStorage.setItem('csrftoken', csrfToken);
                    localStorage.setItem('sessionid', sessionId);
                    console.log('Stored in localStorage:', localStorage.getItem('csrftoken'), localStorage.getItem('sessionid'));
                } catch (error) {
                    console.error('Error extracting or storing tokens:', error);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
