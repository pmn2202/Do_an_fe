import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import accountReducer from "./account/accountSlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
