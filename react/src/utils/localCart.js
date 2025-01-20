import { LOCAL_CART_KEY } from "../constants";

export const saveGuestCart = (cart) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
};

export const getGuestCart = () => {
  const cart = localStorage.getItem(LOCAL_CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const clearGuestCart = () => {
  localStorage.removeItem(LOCAL_CART_KEY);
};
