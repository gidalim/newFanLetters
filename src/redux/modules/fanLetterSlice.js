import initialData from "../../shared/fakedb.json";
console.log(initialData);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchFanLetters = createAsyncThunk(
  "fanLetters/fetchFanLetters",
  async () => {
    const response = await axios.get("/path/to/db.json");
    return response.data;
  }
);

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
