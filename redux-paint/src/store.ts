import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";

// Second arg is our middleware which is our logger.
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger)),
);
