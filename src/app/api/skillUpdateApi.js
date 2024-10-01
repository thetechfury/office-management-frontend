import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';
export const skillUpdateApi = createAsyncThunk(
  'auth/skillUpdateApi',
  async ({ id, credentials }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/profile-skill/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update team');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
