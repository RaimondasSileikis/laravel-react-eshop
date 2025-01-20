import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (searchParams, thunkAPI) => {
    try {
      const response = await axiosClient.get("/admin/categories", {
        params: searchParams,
      });
      return {
        categories: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/admin/categories", {
        params: { all: true },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/admin/categories/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axiosClient.post("/admin/categories", category);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, category }, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/admin/categories/${id}`,
        category
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await axiosClient.delete(`/admin/categories/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  categories: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
  },
  allCategories: [],
  categoryById: {},
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload?.message || action.error.message;
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.meta = action.payload.meta;
        state.isLoading = false;
      })
      .addCase(fetchCategories.rejected, handleRejected)

      // Fetch All categories
      .addCase(fetchAllCategories.pending, handlePending)
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.rejected, handleRejected)

      // Fetch category by ID
      .addCase(getCategoryById.pending, handlePending)
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categoryById = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategoryById.rejected, handleRejected)

      // Create category
      .addCase(createCategory.pending, handlePending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, handleRejected)

      // Update category
      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        state.categories[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, handleRejected)

      // Delete category
      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
        state.isLoading = false;
      });
  },
});
export const { setAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
