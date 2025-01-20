import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/dashboard/products/productsSlice";
import categoriesReducer from "../features/dashboard/categories/categoriesSlice";
import shopProductsReducer from "../features/shop/shopProducts/shopProductsSlice";
import shopCategoriesReducer from "../features/shop/shopCategories/shopCategoriesSlice";
import cartReducer from "../features/shop/cart/cartSlice";
import ordersReducer from "../features/dashboard/orders/ordersSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shop/shopSlice";
import myOrdersReducer from "../features/shop/shopper/myOrders/myOrdersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    shopProducts: shopProductsReducer,
    shopCategories: shopCategoriesReducer,
    shop: shopReducer,
    cart: cartReducer,
    orders: ordersReducer,
    dashboard: dashboardReducer,
    myOrders: myOrdersReducer,
  },
});

export default store;
