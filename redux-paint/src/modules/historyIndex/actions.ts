import { Stroke } from "../../types";

export const UNDO = "UNDO"
export const REDO = "REDO"
export const END_STROKE = "END_STROKE"; // Dunno why...

// A new name for this is optional...
export type HistoryIndexAction =
  | {
    type: typeof UNDO,
    payload: number,
  }
  | {
    type: typeof REDO,
  }
  | {
    type: typeof END_STROKE,
    payload: { stroke: Stroke, historyLimit: number },
  };

export const undo = (undoLimit: number) => {
  // Undo limit, for now, is just the size of the strokes array.
  return { type: UNDO, payload: undoLimit };
};

export const redo = () => {
  return { type: REDO };
};