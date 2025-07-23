import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TeamInfo, TeamState } from '../interface/team.interface';


export const AllTeams = createAsyncThunk(
  'team/info',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:3001/team', {
        withCredentials: true,
      });
     console.log("insid thunk:", res.data);
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);


const initialState: TeamState = {
  loading: false,
  error: null,
  teams: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.teams = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllTeams.fulfilled, (state, action: PayloadAction<TeamInfo[]>) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(AllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = teamSlice.actions;

export default teamSlice.reducer;



