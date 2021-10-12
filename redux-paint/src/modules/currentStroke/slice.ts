import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Point } from "../../utils/types";
import { endStroke } from "../sharedActions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};


// This is so much better - a second time over! Damn.
// Mutation is done with immer.js, a "mutable" immutable library.
export const currentStroke = createSlice({
  name: "currentStroke",
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload];
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export default currentStroke.reducer;

export const { beginStroke, updateStroke, setStrokeColor } = currentStroke.actions;
