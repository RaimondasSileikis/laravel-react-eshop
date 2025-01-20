// features/auth/index.js

// Export thunks
export { loginUser, signUpUser, logoutUser, fetchCurrentUser } from "./authSlice";

// Export reducers and actions
export { clearAuthState, setCurrentUser } from "./authSlice";
export { default as authReducer } from "./authSlice";

// Export pages
export { default as Login } from "./pages/Login";
export { default as SignUp } from "./pages/SignUp";

// Export components
export { default as AuthProvider } from "./components/AuthProvider";
export { default as RequireAuth } from "./components/RequireAuth";
