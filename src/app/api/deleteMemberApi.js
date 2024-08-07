import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';
export const deleteMemeberApi = createAsyncThunk('auth/deleteMemeberApi', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/member/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return userId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});