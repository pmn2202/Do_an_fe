import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  profile: {},
  token: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    doLogoutAction: (state) => {
      state.isAuthenticated = false;
      state.token = initialState.token;
      state.profile = initialState.profile;
    },

    doGetUserInfo: (state, action) => {
      state.profile = action.payload;
    },
    doUpdateUserInfo: (state, action) => {
      state.profile = {
        ...action.payload,
        role: state.profile.role,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  doLoginAction,
  doLogoutAction,
  doGetProfileUser,
  doGetUserInfo,
  doUpdateUserInfo,
} = accountSlice.actions;

export default accountSlice.reducer;
