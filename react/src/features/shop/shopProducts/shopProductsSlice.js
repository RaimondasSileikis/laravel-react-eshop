import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload
    ? action.payload
    : "An error occurred while loading products.";
};

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  "shopProducts/fetchByCategory",
  async ({ categorySlug, params }, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/shop/products/${categorySlug}`, {
        params
      });
      return {
        products: response.data.products,
        meta: response.data.meta,
        categories: response.data.categories,
      };
    } catch (error) {
       return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "shopProducts/fetchAllProducts",
  async (params, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/shop/products`, {
        params,
      });
      return {
        products: response.data.products,
        meta: response.data.meta,
        categories: response.data.categories,
      };
    } catch (error) {
       return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Fetch product by slug
export const fetchProductBySlug = createAsyncThunk(
  "shopProducts/fetchProductBySlug",
  async (productSlug, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `shop/products/get-by-slug/${productSlug}`
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
  products: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
  },
  categories: [],
  product: {},
  isLoading: false,
  error: null,
};

const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products By Category
      .addCase(fetchProductsByCategory.pending, handlePending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = [];
        state.categories = [];
        state.products = action.payload.products;
        state.meta = action.payload.meta;
        state.categories = action.payload.categories;
        state.isLoading = false;
      })
      .addCase(fetchProductsByCategory.rejected, handleRejected)

      // Fetch All Products
      .addCase(fetchAllProducts.pending, handlePending)
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = [];
        state.categories = [];
        state.products = action.payload.products;
        state.meta = action.payload.meta;
        state.categories = action.payload.categories;
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.rejected, handleRejected)
      // Fetch Product By Slug
      .addCase(fetchProductBySlug.pending, handlePending)
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.product = null;
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductBySlug.rejected, handleRejected);
  },
});

export default shopProductsSlice.reducer;
