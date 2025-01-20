import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload
    ? action.payload
    : "An error occurred while loading categories.";
};

// Thunk for fetching category by slug
export const fetchCategoryBySlug = createAsyncThunk(
  "categories/fetchCategoryBySlug",
  async (categorySlug, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `shop/categories/get-category-by-slug/${categorySlug}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
       message: error.response?.data?.message || error.message,
       status: error.response?.status,
     });
   }
  }
);

const initialState = {
  category: {},
  categories: [],
  isLoading: false,
  error: null,
};

const shopCategoriesSlice = createSlice({
  name: "shopCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories by Slug
      .addCase(fetchCategoryBySlug.pending, handlePending)
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.category = {};
        state.categories = [];
        state.category = action.payload;
        state.categories = action.payload.children || [];
        state.isLoading = false;
      })
      .addCase(fetchCategoryBySlug.rejected, handleRejected)
  },
});

export default shopCategoriesSlice.reducer;
