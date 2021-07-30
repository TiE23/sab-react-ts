import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";
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
  draggedItem: DragItem | null, // Different from Flow: Not "?DragItem"!
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

    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);

      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }
    case "MOVE_TASK": {
      const {
        draggedItemId,
        hoveredItemId,
        sourceColumnId,
        targetColumnId,
      } = action.payload;

      // First, find the source + target list (column).
      const sourceListIndex = findItemIndexById(
        draft.lists,
        sourceColumnId,
      );
      const targetListIndex = findItemIndexById(
        draft.lists,
        targetColumnId,
      );

      // Using the same function, find the index of the source drag.
      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId,
      );

      const hoverIndex = hoveredItemId
      ? findItemIndexById(
        draft.lists[targetListIndex].tasks,
        hoveredItemId,
      ) : 0;  // It is possible to drag a card to an emtpy column, so, 0.

      const item = draft.lists[sourceListIndex].tasks[dragIndex];
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1); // Remove from
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item); // Add to
      break;
    }
    default:
      break;
  }
};