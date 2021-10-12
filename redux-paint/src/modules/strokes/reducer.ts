import { RootState } from "../../types";
import { createReducer } from "@reduxjs/toolkit";
import { endStroke } from "../../actions";

const initialStrokes: RootState["strokes"] = [];

export const reducer = createReducer(initialStrokes, (builder) => {
  builder.addCase(endStroke, (state, action) => {
    const { historyIndex, stroke } = action.payload;
    if (historyIndex === 0) {
      // Just push to end.
      state.push(stroke);
    } else {
      // Trim off end and add new strokee.
      state.splice(-historyIndex, historyIndex, stroke);
      // lol, I cannot remember the last time I used a minus sign like that.
    }
  });
});
