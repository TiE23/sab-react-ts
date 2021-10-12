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

/*
export const reducer = createReducer(initialState, (builder) => {
  // Because we're editing a basic number, we return instead of update state.
  builder.addCase(undo, (state, action) => {
    return Math.min(state + 1, action.payload);
  });
  builder.addCase(redo, (state, action) => {
    return Math.max(state - 1, 0);
  });
  builder.addCase(endStroke, (state, action) => {
    // Example, you wouldn't write "state = 0;" and be done. No. We return.
    return 0;
  });
})
*/
