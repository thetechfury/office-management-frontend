import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';
export const deleteCategoryApi = createAsyncThunk('auth/deleteCategoryApi', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/inventory-item-category/${id}/`, {
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