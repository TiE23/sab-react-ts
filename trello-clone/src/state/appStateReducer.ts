import { Action } from "./actions";
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

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST":
      // Remember the general limitations of the spread operator for changes!
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: []}, // New list here!
        ],
      };
    default:
      return state;
  }
};