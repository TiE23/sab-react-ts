import { createAction } from "@reduxjs/toolkit";
import { Stroke } from "../utils/types";

// Because this is shared we need to define it instead of in createSlice().
export const endStroke = createAction<{
  stroke: Stroke,
  historyIndex: number,
}>("endStroke");
