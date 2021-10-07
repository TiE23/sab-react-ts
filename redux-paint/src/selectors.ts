// Selectors are a way to separate retrieval logic from the rendering logic.
// Basically, they're a bunch of getters. It's good because it separates things.
// It's used with useSelector() provided by react-redux.

import { RootState } from "./types";

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
export const strokesSelector = (state: RootState) => state.strokes;
export const historyIndexSelector = (state: RootState) => state.historyIndex;