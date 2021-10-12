import { endStroke, redo, undo } from "../../actions";
import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../types";

const initialState: RootState["historyIndex"] = 0;

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
