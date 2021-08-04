// TS vs Flow: No need to import Types separate from functions.
import { createContext, useContext, useEffect, Dispatch } from "react";
import { save } from "../api";
import { Action } from "./actions";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { DragItem } from "../DragItem";
import { useImmerReducer } from "use-immer";
import { withInitialState } from "../withInitialState";

type AppStateContextProps = {
  draggedItem: DragItem | null,
  lists: List[],
  getTasksByListId(id: string): Task[],
  dispatch: Dispatch<Action>,
};

// The default value is just {} - a default value is only used if we don't wrap
// our application into our AppStateProvider.
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps, // This is the way to cast to a type.
);

type AppStateProviderProps = {
  children: React.ReactNode,  // Clear that this is a wrapper!
  initialState: AppState,
};

// Wrapped the entire Provider function inside our HOC "withInitialState".
export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    // Send state to the API every time there is a change!
    // Yes, this happens... a lot. This shouldn't be a real thing but we're learning here!
    useEffect(() => {
      save(state);
    }, [state]);

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    // Really basic wrapper component.
    return (
      // The "value" is the prop that is accessible by all context consumers.
      // Remember, the "value" is locked to the ContextProps up above!
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

// This function is the way that we gain access to the central App State.
export const useAppState = () => {
  // Remember, Typescript can automatically derive the return value of this func
  return useContext(AppStateContext);
};
