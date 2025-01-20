import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (searchParams, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        "/admin/products", {
        params: searchParams,
      });
      return {
        products: response.data.data,
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

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/admin/products/${id}`
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

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        "/admin/products", product
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        `/admin/products/${id}`, product
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await axiosClient.delete(
        `/admin/products/${id}`
      );
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
  products: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
  },
  productById: {},
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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.meta = action.payload.meta;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, handleRejected)

      // Fetch product by ID
      .addCase(getProductById.pending, handlePending)
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productById = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, handleRejected)

      // Create product
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, handleRejected)

      // Update product
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, handleRejected)

      // Delete product
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export default productsSlice.reducer;
