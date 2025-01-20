import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearGuestCart,
  getGuestCart,
  saveGuestCart,
} from "../../../utils/localCart";

// Merge guest cart with user cart after login
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeQuestCart",
  async (_, thunkAPI) => {
    try {
      const guestCart = getGuestCart();
      const response = await axiosClient.post(
        "/shop/cart/merge-guest-cart", {
        items: guestCart,
      });
      clearGuestCart();
      return response.data.cartItems;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to merge guest cart."
      );
    }
  }
);

// Add item to cart (guest or authenticated user)
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ product, quantity = 1 }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.userToken;
    const { id, slug, title, image_url, image_alt, price } = product;
    if (user) {
      try {
        const response = await axiosClient.post(
          "/shop/cart", {
          product_slug: slug,
          quantity,
        });
        if (response.status === 200) {
          toast.success("Product placed successfully!");
        }
        return response.data.cartItem;
      } catch (error) {
        toast.error("Failed to place the product. Please try again.");
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to add item to cart."
        );
      }
    } else {
      const guestCart = getGuestCart();
      let newItem;
      const existingItem = guestCart.find((item) => item.product_slug === slug);
      if (existingItem) {
        existingItem.quantity += quantity;
        return existingItem;
      } else {
        newItem = {
          id: slug,
          product_id: id,
          product_slug: slug,
          title,
          image_url,
          image_alt,
          price,
          quantity,
        };
        guestCart.push(newItem);
      }
      saveGuestCart(guestCart);
      toast.success("Product added to the cart!");
      return newItem;
    }
  }
);

// Fetch cart items(guest or authenticated user)
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.userToken;
    if (user) {
      try {
        const response = await axiosClient.get(
          "/shop/cart"
        );
        return response.data.cartItems;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to fetch cart items."
        );
      }
    } else {
      try {
        const guestCart = getGuestCart();
        return guestCart;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          "Failed to fetch cart items from local storage."
        );
      }
    }
  }
);

// Update cart items(guest or authenticated user)
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productSlug, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.userToken;

    if (user) {
      try {
        const response = await axiosClient.put(
          `/shop/cart/${productSlug}`, {
          quantity,
        });
        return response.data.cartItem;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to update cart item."
        );
      }
    } else {
      const guestCart = getGuestCart();
      const existingItem = guestCart.find(
        (item) => item.product_slug === productSlug
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        saveGuestCart(guestCart);
      }
      return { product_slug: productSlug, quantity };
    }
  }
);

// Remove cart items(guest or authenticated user)
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productSlug, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.userToken;
    if (user) {
      try {
        const response = await axiosClient.delete(
          `/shop/cart/${productSlug}`
        );
        return productSlug;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to remove item from cart."
        );
      }
    } else {
      const guestCart = getGuestCart();
      const updatedCart = guestCart.filter(
        (item) => item.product_slug !== productSlug
      );
      saveGuestCart(updatedCart);
      return productSlug;
    }
  }
);

const initialState = {
  cartItems: getGuestCart() || [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      clearGuestCart();
    },
  },
  extraReducers: (builder) => {
    builder
      // Merge guest cart
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      // Add Cart Item
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const newCartItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.product_slug === newCartItem.product_slug
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex].quantity = newCartItem.quantity;
        } else {
          state.cartItems.push(newCartItem);
        }
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add item to cart.";
      })
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart items.";
      })
      // Update Cart Item Quantity
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCartItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.product_slug === updatedCartItem.product_slug
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex].quantity =
            updatedCartItem.quantity;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update cart item.";
      })
      // Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const productSlug = action.payload;
        state.cartItems = state.cartItems.filter(
          (item) => item.product_slug !== productSlug
        );
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to remove item from cart.";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
