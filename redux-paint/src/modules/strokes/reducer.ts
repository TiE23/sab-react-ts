import { RootState } from "../../types";
import { Action, END_STROKE } from "./actions";

/*
 * "Note that here we don't modify the historyIndex state. We have a separate
 * END_STROKE action handler in the historyIndex reducer."
 *
 * The reason we have multiple actions defined for END_STROKE is that we've
 * separated concerns in a way that's more manageable.
 * For historyIndex we want to set it to zero as we've made a new stroke.
 * For currentStroke we want to clear the points as it's done.
 * For strokes we want to trim off any further strokes we no longer want.
*/
export const reducer = (
  state: RootState["strokes"] = [],
  action: Action,
) => {
  switch (action.type) {
    case END_STROKE: {
      const { historyLimit, stroke } = action.payload;

      if (!stroke.points.length) {
        return state;
      }

      // Trim off the abandoned future strokes.
      return [
        ...state.slice(0, state.length - historyLimit),
        stroke,
      ];
    }
    default:
      return state;
  }
}