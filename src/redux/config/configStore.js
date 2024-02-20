import { configureStore } from "@reduxjs/toolkit";
import fanLetterSlice from "../modules/fanLetterSlice";
import modalSlice from "../modules/modalSlice";

const store = configureStore({
  reducer: {
    fanLetterSlice,
    modalSlice,
  },
});

export default store;
