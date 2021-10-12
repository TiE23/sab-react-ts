import { RootState } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";

const initialState: RootState["strokes"] = [];

export const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {}, // Only one action that is shared means this is blank.
  extraReducers: (builder) => {
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
  },
});

export default strokes.reducer;
// There are no exported actions (you'll use the shared one!).

/*
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
*/
