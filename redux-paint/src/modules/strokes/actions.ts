import { createAction } from "@reduxjs/toolkit";
import { Stroke } from "../../types";

export const endStroke = createAction<{
  stroke: Stroke,
  historyIndex: number,
}>("endStroke");

/*
export const END_STROKE = "END_STROKE";

export type Action = {
  type: typeof END_STROKE,
  payload: { stroke: Stroke, historyLimit: number },
};

export type HistoryIndexAction = {
  type: typeof END_STROKE,
  payload: { stroke: Stroke, historyLimit: number },
};
*/
