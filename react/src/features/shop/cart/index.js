// features/cart/index.js

// Export thunks
export { mergeGuestCart, addCartItem, fetchCartItems, updateCartItem, removeCartItem } from "./cartSlice";

// Export reducers and actions
export { clearCart } from "./cartSlice";
export { default as cartReducer } from "./cartSlice";

// Export components
export { default as Cart } from "./components/Cart";
