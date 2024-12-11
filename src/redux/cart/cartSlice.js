import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("extendProduct")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    doGetCartListItemAction: (state, action) => {
      const cartGet = action.payload;
      const extendCart = cartGet.map((item) => {
        const cartItem = state.cart.find(
          (pro) =>
            pro.product_id === item.product_id &&
            pro.childTitle === item.childTitle
        );
        if (
          cartItem &&
          item.product_id === cartItem.product_id &&
          item.childTitle === cartItem.childTitle
        ) {
          return {
            ...item,
            selected: cartItem.selected,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      });
      state.cart = extendCart;
    },
    doLogOutCart: (state) => {
      state.cart = [];
    },
    doUpdateQuantityAction: (state, action) => {
      const { id, title, value } = action.payload;
      const updateCart = state.cart.map((item) => {
        if (item.product_id === id && item.childTitle === title) {
          return {
            ...item,
            quantity: value,
          };
        }
        return item;
      });
      state.cart = updateCart;
    },
    doUpdateSelectAction: (state, action) => {
      const { id, childTitle } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.product_id === id && item.childTitle === childTitle) {
          return {
            ...item,
            selected: !item.selected,
          };
        } else {
          return item;
        }
      });
      state.cart = newCart;
      localStorage.setItem("extendProduct", JSON.stringify(newCart));
    },
    doUpdateSelectAll: (state, action) => {
      const checkAll = action.payload;
      const newCart = state.cart.map((item) => {
        return {
          ...item,
          selected: !checkAll,
        };
      });
      state.cart = newCart;
      localStorage.setItem("extendProduct", JSON.stringify(newCart));
    },
    doBuyNowAction: (state, action) => {
      const { id, number } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.product_id === id) {
          return {
            ...item,
            quantity: number,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      });
      state.cart = newCart;
      localStorage.setItem("extendProduct", JSON.stringify(newCart));
    },
  },
});

export const {
  doGetCartListItemAction,
  doUpdateQuantityAction,
  doUpdateSelectAction,
  doUpdateSelectAll,
  doBuyNowAction,
  doLogOutCart,
} = cartSlice.actions;

export default cartSlice.reducer;
