import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../../cart";

// Place an New Order
export const placeNewOrder = createAsyncThunk(
  "myOrders/placeNewOrder",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        "/shop/shopper/orders"
      );
      if (response.status === 200) {
        toast.success("Order placed successfully!");
      }
      clearCart();
      return response.data;
    } catch (error) {
      toast.error("Failed to place the order. Please try again.");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to place order."
      );
    }
  }
);

// Fetch My Orders
export const fetchMyOrders = createAsyncThunk(
  "myOrders/fetchMeOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        "/shop/shopper/orders"
      );
      return response.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

// Get Me order details by ID
export const getMyOrderById = createAsyncThunk(
  "myOrders/getMeOrderById ",
  async (orderId, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/shop/shopper/orders/${orderId}`
      );
      return response.data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  newOrder: null,
  myOrderById: null,
  myOrders: [],
  isLoading: false,
  error: null,
};

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrder = action.payload;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to place order.";
      })
      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get My Order By ID
      .addCase(getMyOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myOrderById = action.payload;
      })
      .addCase(getMyOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default myOrdersSlice.reducer;
