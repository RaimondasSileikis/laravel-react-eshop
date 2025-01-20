import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../lib/axios";

// Utility functions for handling states
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload
    ? action.payload.error
    : "An error occurred while loading categories Tree.";
};

// Thunk for fetching the categories tree
export const fetchCategoriesTree = createAsyncThunk(
  "shop/fetchCategoriesTree",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        "shop/categories/tree"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          error: "An error occurred while fetching the categories tree.",
        }
      );
    }
  }
);

const initialState = {
  categoriesTree: [],
  isLoading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesTree.pending, handlePending)
      .addCase(fetchCategoriesTree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoriesTree = action.payload || [];
      })
      .addCase(fetchCategoriesTree.rejected, handleRejected);
  },
});

export default shopSlice.reducer;
