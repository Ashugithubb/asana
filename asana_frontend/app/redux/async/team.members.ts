import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchTeamMebers = createAsyncThunk(
  'team/member',
  async (teamId:number, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3001/team-memebrs/${teamId}`, {
        withCredentials: true,
      });
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);