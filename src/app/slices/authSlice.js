import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup } from "@/app/api/authentication";
import { getUserProfile } from "@/app/api/getUserProfileApi";
import { deleteUser } from "@/app/api/deleteUserApi";

const BASE_URL = 'http://127.0.0.1:8000';
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user,
    token,
    singleUser: null,
    users: [],
    totalUsers: 0,
    totalTeams: 0,
    activeUsers: 0,
    activeUserPtg: 0,
    userProfile: [],
    loading: false,
    error: null,
};

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user data');
        const { results, current_user } = data;
        thunkAPI.dispatch(setTotalUsers(data.total_users));
        thunkAPI.dispatch(setTotalTeams(data.total_teams));
        thunkAPI.dispatch(setActiveUsers(data.number_of_active_users));
        thunkAPI.dispatch(setActiveUsersPtg(data.active_user_percentage));
        return { users: results, singleUser: current_user };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const setTotalUsers = (totalUsers) => ({
    type: 'auth/setTotalUsers',
    payload: totalUsers,
});
export const setTotalTeams = (totalTeams) => ({
    type: 'auth/setTotalTeams',
    payload: totalTeams,
});
export const setActiveUsers = (activeUsers) => ({
    type: 'auth/setActiveUsers',
    payload: activeUsers,
});
export const setActiveUsersPtg = (activeUserPtg) => ({
    type: 'auth/setActiveUsersPtg',
    payload: activeUserPtg,
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.users = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        setTotalUsers: (state, action) => {
            state.totalUsers = action.payload;
        },
        setTotalTeams: (state, action) => {
            state.totalTeams = action.payload;
        },
        setActiveUsers: (state, action) => {
            state.activeUsers = action.payload;
        },
        setActiveUsersPtg: (state, action) => {
            state.activeUserPtg = action.payload;
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
                state.token = action.payload.token;
                state.user = true;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload.token);
                    localStorage.setItem('user', JSON.stringify('true'));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.singleUser = action.payload.singleUser;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
