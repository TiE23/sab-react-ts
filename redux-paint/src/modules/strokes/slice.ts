import { RootState, Stroke } from "../../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";

const initialState: RootState["strokes"] = [];

export const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {
    setStrokes: (state, action: PayloadAction<Stroke[]>) => {
      return action.payload;
    },
  }, // Only one action that is shared means this is blank.
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

export const { setStrokes } = strokes.actions;

