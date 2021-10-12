import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Point } from "../../types";
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

/*
import {
  beginStroke,
  updateStroke,.y.
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
*/
