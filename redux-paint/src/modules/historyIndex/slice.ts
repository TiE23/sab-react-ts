import { endStroke } from "../sharedActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const historyIndex = createSlice({
  name: "historyIndex",
  initialState: 0,
  reducers: {
    // Numbers must be returned, not edited (like "state = 0").
    // See: https://immerjs.github.io/immer/pitfalls/
    undo: (state, action: PayloadAction<number>) => {
      return Math.min(state + 1, action.payload);
    },
    redo: (state) => {
      return Math.max(state - 1, 0);
    },
  },
  extraReducers: (builder) => {
    // Because this action is shared we define it elsewhere and write its reducer here.
    builder.addCase(endStroke, () => {
      return 0;
    });
  },
});

export default historyIndex.reducer;

export const { undo, redo } = historyIndex.actions;
