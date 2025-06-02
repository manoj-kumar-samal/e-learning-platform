import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getStudentDashboard = createAsyncThunk(
  'dashboard/getStudent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth.user;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${API_URL}/dashboard/student`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getInstructorDashboard = createAsyncThunk(
  'dashboard/getInstructor',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth.user;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${API_URL}/dashboard/instructor`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    enrolledCourses: [],
    upcomingClasses: [],
    assignments: [],
    quizzes: [],
    earnings: [],
    analytics: {},
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload.enrolledCourses;
        state.upcomingClasses = action.payload.upcomingClasses;
        state.assignments = action.payload.assignments;
        state.quizzes = action.payload.quizzes;
      })
      .addCase(getStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInstructorDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInstructorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = action.payload.earnings;
        state.analytics = action.payload.analytics;
      })
      .addCase(getInstructorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;