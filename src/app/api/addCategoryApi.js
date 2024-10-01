import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';
export const addCategoryApi = createAsyncThunk('auth/addCategoryApi', async (credentials,thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/inventory-item-category/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create team');

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
