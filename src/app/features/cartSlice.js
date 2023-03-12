import { createSlice } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

import { addItemToShoppingCart } from "../../utils";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(action.payload, state.cartProducts);
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload);
      toast({
        title: "Removed from your cart.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    clearCart: state => {
      state.cartProducts = [];
      toast({
        title: "Your cart is empty now.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = ({ cart }) => cart;
export default cartSlice.reducer;
