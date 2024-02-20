import { createSlice } from "@reduxjs/toolkit";
import initialData from "../../shared/db.json";

const initialState = {
  fanLetters: initialData,
};

export const fanLetterSlice = createSlice({
  name: "fanLetters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.fanLetters.push(action.payload);
    },
    deleteLetter: (state, action) => {
      state.fanLetters = state.fanLetters.filter(
        (letter) => letter.id !== action.payload
      );
    },
    updateLetter: (state, action) => {
      const index = state.fanLetters.findIndex(
        (letter) => letter.id === action.payload.id
      );
      if (index !== -1) {
        state.fanLetters[index] = action.payload;
      }
    },
  },
});

export const { addLetter, deleteLetter, updateLetter } = fanLetterSlice.actions;
export default fanLetterSlice.reducer;
