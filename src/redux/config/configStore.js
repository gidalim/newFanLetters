import { configureStore } from "@reduxjs/toolkit";
import fanLetter from "../modules/fanLetter";

const store = configureStore({
  reducer: {
    fanLetter,
  },
});

export default store;
