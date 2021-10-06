import { RootState } from "./types";
import {
  Action,
  BEGIN_STROKE,
  END_STROKE,
  UPDATE_STROKE,
  SET_STROKE_COLOR,
} from "./actions";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000" },
  strokes: [],
  // historyIndex: 0,
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action,
) => {
  switch(action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload], // First point of the new stroke.
        },
      };
    }
    case UPDATE_STROKE: {
      // Do note that it's important to update with new objects. See...
      // https://redux.js.org/usage/structuring-reducers/immutable-update-patterns
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],  // Append.
        },
      };
    }
    case END_STROKE: {
      if (!state.currentStroke.points.length) {
        // END_STROKE is also called when leaving the canvas, so, we don't want
        // to waste time when there's no active stroke being created.
        return state;
      }
      return {
        ...state,
        currentStroke: { ...state.currentStroke, points: []},
        strokes: [...state.strokes, state.currentStroke], // Add current stroke.
      };
    }
    case SET_STROKE_COLOR: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          ...{ color: action.payload }, // Interesting spread use... huh...
        },
      };
    }
    default:
      return state;
  }
};
