import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOCAL_USER_TOKEN } from "../../constants";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload
    ? action.payload.error
    : "An error occurred while logging in.";
};

// Thunk for loginUser
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      if (response.status === 200) {
        toast.success("Login successful!");
      }
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to login. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for signUpUser
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    { name, email, password, password_confirmation: passwordConfirmation },
    thunkAPI
  ) => {
    try {
      const response = await axiosClient.post("auth/sign-up", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      if (response.status === 201) {
        toast.success("Account created successfully! Please log in.");
      }
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to sign up. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for logoutUser
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.post("auth/user-logout");
      if (response.status === 200) {
        toast.success("Logged out successfully!");
      }
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to log out. Please try again.";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for getting current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("auth/get-me");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  currentUser: null,
  userToken: localStorage.getItem(LOCAL_USER_TOKEN) || "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.userToken = null;
      state.currentUser = null;
      localStorage.removeItem(LOCAL_USER_TOKEN);
    },
    setCurrentUser: (state, action) => {
      state.userToken = action.payload.userToken;
      state.currentUser = action.payload.currentUser;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
        state.currentUser = action.payload.user;
        localStorage.setItem(LOCAL_USER_TOKEN, action.payload.token);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, handleRejected)
      // signUpUser
      .addCase(signUpUser.pending, handlePending)
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
        state.currentUser = action.payload.user;
        localStorage.setItem(LOCAL_USER_TOKEN, action.payload.token);
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, handleRejected)
      // LogoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        authSlice.caseReducers.clearAuthState(state);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload
          ? action.payload.error
          : "An error occurred during logout.";
      })
      // Current user
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, handleRejected);
  },
});

export const { clearAuthState, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
