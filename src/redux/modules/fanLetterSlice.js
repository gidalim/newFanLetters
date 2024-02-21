import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "../../axios/api";

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPI) => {
    try {
      await jsonApi.post(`/letters`, payload);
      const { data } = await jsonApi.get(`/letters`);
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
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const __updateLetter = createAsyncThunk(
  "updateLetter",
  async (updatedLetter, thunkAPI) => {
    try {
      await jsonApi.patch(`/letters/${updatedLetter.id}`, {
        content: updatedLetter.content,
      });
      const { data } = await jsonApi.get(`/letters`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (id, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${id}`);
      const { data } = await jsonApi.get(`/letters`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const initialState = {
  fanLetters: [],
  isLoading: true,
  isError: false,
  error: null,
};

export const fanLetterSlice = createSlice({
  name: "fanLetters",
  initialState,
  reducers: {},
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
      state.error = action.payload;
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
      state.error = action.payload;
    });
    builder.addCase(__deleteLetter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__deleteLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fanLetters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__deleteLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__updateLetter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__updateLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fanLetters = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__updateLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default fanLetterSlice.reducer;
