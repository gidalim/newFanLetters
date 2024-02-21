import { configureStore } from "@reduxjs/toolkit";
import fanLetterSlice from "../modules/fanLetterSlice";
import modalSlice from "../modules/modalSlice";
import authSlice from "../modules/authSlice";

const store = configureStore({
  reducer: {
    fanLetterSlice,
    modalSlice,
    authSlice,
  },
});

export default store;
