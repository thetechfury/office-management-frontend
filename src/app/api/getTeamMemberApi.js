import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000';
export const getTeamMemberApi = createAsyncThunk(
  'auth/getTeamMemberApi',
  async ( id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/team/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${token}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to get member');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
