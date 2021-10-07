import { RootState } from "./types";
import {
  Action,
  BEGIN_STROKE,
  END_STROKE,
  UPDATE_STROKE,
  SET_STROKE_COLOR,
  UNDO,
  REDO,
} from "./actions";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000" },
  strokes: [],
  historyIndex: 0,
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
      // The current location within history we're in. So we might overwrite
      // un-done strokes starting with this one.
      const historyLimit = state.strokes.length - state.historyIndex;
      return {
        ...state,
        historyIndex: 0,  // New strokes resets history.
        currentStroke: { ...state.currentStroke, points: []},
        strokes: [...state.strokes.slice(0, historyLimit), state.currentStroke], // Add current stroke.
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
    case UNDO: {
      // Undo INCREASES the historyIndex as we subtract the number from the current stroke's index.
      // min() because we cannot allow historyIndex + 1 to be larger than actual strokes array size.
      const historyIndex = Math.min(
        state.historyIndex + 1,
        state.strokes.length,
      );
      return {
        ...state,
        historyIndex,
      }
    }
    case REDO: {
      // Redo DECREASES the historyIndex as we subtract the number from the current stroke's index.
      // max() because we cannot allow historyIndex - 1 to be smaller than 0 (that would be travelling
      // into a future that does not exist yet, as 0 is the current.)
      const historyIndex = Math.max(state.historyIndex - 1, 0);
      return {
        ...state,
        historyIndex,
      };
    }
    default:
      return state;
  }
};
