// features/dashboard/orders/index.js

// Export thunks
export { fetchOrders, getOrderById, updateOrderStatus, getOrderStatuses,   } from "./ordersSlice";

// Export reducers and actions
export { default as ordersReducer } from "./ordersSlice";

// Export pages
export { default as OrderDetail } from "./pages/OrderDetail";
export { default as OrdersList } from "./pages/OrdersList";
