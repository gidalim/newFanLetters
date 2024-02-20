import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fanLetter: [],
};

export const fanLetterSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
});

export const {} = fanLetterSlice.actions;
export default fanLetterSlice.reducer;
