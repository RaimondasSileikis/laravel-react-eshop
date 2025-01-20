// features/shop/shopProducts/index.js

// Export thunks
export { fetchProductsByCategory, fetchAllProducts, fetchProductBySlug } from "./shopProductsSlice";

// Export reducers and actions
export { default as shopProductsReducer } from "./shopProductsSlice";

// Export pages
export { default as Products } from "./pages/Products";
export { default as ProductsByCategory } from "./pages/ProductsByCategory";
export { default as ProductView } from "./pages/ProductView";
