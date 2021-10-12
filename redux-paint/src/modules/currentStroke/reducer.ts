import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../types";

import {
  beginStroke,
  updateStroke,
  setStrokeColor,
  endStroke,
} from "../../actions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

// This is so much better. Damn.
// Mutation is done with immer.js, a "mutable" immutable library.
export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(beginStroke, (state, action) => {
    state.points = [action.payload];
  });
  builder.addCase(updateStroke, (state, action) => {
    state.points.push(action.payload);
  });
  builder.addCase(setStrokeColor, (state, action) => {
    state.color = action.payload;
  });
  builder.addCase(endStroke, (state, _action) => {
    state.points = [];
  });
});
