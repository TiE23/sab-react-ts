import { configureStore, combineReducers} from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";
import currentStroke from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";
import { logger } from "redux-logger";

export const store = configureStore({
  reducer: combineReducers({
    historyIndex,
    currentStroke,
    strokes,
  }),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
