import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
    },
    logout: (state, action) => {
      state.isLoggedin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
