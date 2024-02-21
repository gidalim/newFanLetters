import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "../../axios/api";

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.post(`/letters`, payload);
      const { data } = await jsonApi.get(`/letters?_sort=time&_order=desc`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await jsonApi.get(`/letters`);
      return data;
    } catch (error) {
      console.log("get하는 중 오류발생함", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  fanLetters: [],
  isLoading: false,
  isError: false,
  error: null,
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
  extraReducers: (builder) => {
    builder.addCase(__addLetter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__addLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fanLetters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__addLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.toString();
    });
    builder.addCase(__getLetters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__getLetters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fanLetters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__getLetters.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload.toString();
    });
  },
});

export const { addLetter, deleteLetter, updateLetter } = fanLetterSlice.actions;
export default fanLetterSlice.reducer;
