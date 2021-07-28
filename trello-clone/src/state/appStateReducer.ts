import { Action } from "./actions";
import { findItemIndexById } from "../utils/arrayUtils";
import { nanoid } from "nanoid";  // Generates UUIDv4-like IDs.

export type Task = {
  id: string,
  text: string,
};

export type List = {
  id: string,
  text: string,
  tasks: Task[],
};

export type AppState = {
  lists: List[],  // Difference from Flow: Not "Array<List>"!
};

// If we init the state we might return AppState, so, not just void return.
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  switch (action.type) {
    // TS is smart enough to discriminate between "type" in this switch.
    case "ADD_LIST":
      // Instead of "state" we have "draft" to use with ImmerJS. That way we
      // know it is mutable. ImmerJS is taking care of this for us!
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    case "ADD_TASK":
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);

      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    default:
      break;
  }
};