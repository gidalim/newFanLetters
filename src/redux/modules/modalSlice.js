import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isDivVisible: true,
  editContent: "",
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.isDivVisible = action.payload.isDivVisible;
      state.editContent = action.payload.content;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isDivVisible = true;
      state.editContent = "";
    },
    setEditContents: (state, action) => {
      state.editContent = action.payload;
    },
  },
});

export const { openModal, closeModal, setEditContents } = modalSlice.actions;
export default modalSlice.reducer;
