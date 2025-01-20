import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../lib/axios";

// Fetch overview/
export const fetchOverview = createAsyncThunk('dashboard/fetchOverview', async (_, thunkAPI) => {
  try {
    const response = await axiosClient.get(
      '/admin/dashboard/overview'
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    });
  }
});

const initialState = {
  overview: {},
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Overview
      .addCase(fetchOverview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
