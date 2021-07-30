/*
  This is the file that is home to all the different actions. Actions are nearly
  minor enough to skip defining if you really wanted to, but it makes things a
  lot cleaner in the long run. They let you call functions instead of attempting
  to define objects. It just keeps things a little cleaner even if it doesn't
  appear to contribute all that much.
*/

import { DragItem } from "../DragItem";

// Using unique "type" properties is a strategy called a "discriminated union".
export type Action =
  | {
    type: "ADD_LIST",
    payload: string,
  }
  | {
    type: "ADD_TASK",
    payload: {text: string, listId: string},
  }
  | {
    type: "MOVE_LIST",
    payload: {draggedId: string, hoverId: string},
  }
  | {
    type: "MOVE_TASK",
    payload: {
      draggedItemId: string,
      hoveredItemId: string | null, // Could be not hovering anywhere.
      sourceColumnId: string,
      targetColumnId: string,
    },
  }
  | {
    type: "SET_DRAGGED_ITEM",
    payload: DragItem | null,
  };

export const addList = (
  text: string,
): Action => ({
  type: "ADD_LIST",
  payload: text,
});

export const addTask = (
  text: string,
  listId: string,
): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId,
  },
});

export const moveList = (
  draggedId: string,
  hoverId: string,
): Action => ({
  type: "MOVE_LIST",
  payload: {
    draggedId,
    hoverId,
  },
});

export const moveTask = (
  draggedItemId: string,
  hoveredItemId: string | null, // Could be not hovering anywhere.
  sourceColumnId: string,
  targetColumnId: string,
): Action => ({
  type: "MOVE_TASK",
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId,
  },
});

export const setDraggedItem = (
  draggedItem: DragItem | null,
): Action => ({
  type: "SET_DRAGGED_ITEM",
  payload: draggedItem,
});
