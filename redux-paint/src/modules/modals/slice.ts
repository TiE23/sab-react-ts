import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../utils/types";

const initialState: ModalState = {
  isShown: true,
  modalName: null,
};

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.isShown = true;
      state.modalName = action.payload;
    },
    hide: (state) => {
      state.isShown = false;
      state.modalName = null;
    },
  },
});

export const modalVisible = slice.reducer;

export const { show, hide } = slice.actions;
