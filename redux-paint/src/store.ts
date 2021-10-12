import { Action, configureStore, combineReducers, ThunkAction} from "@reduxjs/toolkit";
import historyIndex from "./modules/historyIndex/slice";
import currentStroke from "./modules/currentStroke/slice";
import strokes from "./modules/strokes/slice";
import { modalVisible } from "./modules/modals/slice";
import { logger } from "redux-logger";
import { RootState } from "./utils/types";

export const store = configureStore({
  reducer: combineReducers({
    historyIndex,
    currentStroke,
    strokes,
    modalVisible,
  }),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
