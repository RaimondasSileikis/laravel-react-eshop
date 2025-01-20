import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (searchParams, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        "/admin/orders", {
        params: searchParams,
      });
      return {
        orders: response.data.data,
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

// Get order details by ID
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const response = await axiosClient.get(
        `/admin/orders/${orderId}`
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

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await axiosClient.patch(
        `/admin/orders/${orderId}`, {
        status,
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

// Fetch orders Statuses
export const getOrderStatuses = createAsyncThunk(
  "orders/getOrderStatuses",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/admin/orders-statuses");
      return response.data.statuses;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  orders: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0,
  },
  orderById: null,
  orderStatuses: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.meta = action.payload.meta;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderById = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Order By Id
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(
          (order) => order.id === updatedOrder.id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = updatedOrder.status;
        }
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Order Statuses
      .addCase(getOrderStatuses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderStatuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStatuses = action.payload;
      })
      .addCase(getOrderStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch order statuses.";
      });
  },
});

export default ordersSlice.reducer;
