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

/*
import {
  Action,
  BEGIN_STROKE,
  UPDATE_STROKE,
  SET_STROKE_COLOR,
  END_STROKE,
} from "./actions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

export const reducer = (
  state: RootState["currentStroke"] = initialState,
  action: Action,
) => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return { ...state, points: [action.payload] };
    }
    case UPDATE_STROKE: {
      return { ...state, points: [...state.points, action.payload] };
    }
    case SET_STROKE_COLOR: {
      return { ...state, color: action.payload };
    }
    case END_STROKE: {
      return { ...state, points: [] };
    }
    default:
      return state;
  }
};
*/
