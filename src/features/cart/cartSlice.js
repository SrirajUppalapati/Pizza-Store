import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((curr) => curr.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((curr) => curr.pizzaId === action.payload);

      if (item.quantity < 1) {
        cartSlice.caseReducers(deleteItem(state, action));
      }
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((curr) => curr.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  deleteItem,
  addItem,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalNoOfPizzas = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);

export const getTotalPriceOfPizzas = (state) =>
  state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((curr) => curr.pizzaId === id)?.quantity ?? 0;
