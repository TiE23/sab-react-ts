import { createContext, useContext, FC } from "react";

type Task = {
  id: string,
  text: string,
};

type List = {
  id: string,
  text: string,
  tasks: Task[],
};

export type AppState = {
  lists: List[],  // Difference from Flow: Not "Array<List>"!
};

type AppStateContextProps = {
  lists: List[],
  getTasksByListId(id: string): Task[],
};

// The default value is just {} - a default value is only used if we don't wrap
// our application into our AppStateProvider.
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps, // This is the way to cast to a type.
);

// Temporary hard-coded values.
const appData = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Beging to use static typing" }],
    },
  ],
};

// Define our provider component as a FunctionComponent ("FC").
export const AppStateProvider: FC = ({ children }) => {
  const { lists } = appData;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  // Really basic wrapper component.
  return (
    // The value is the prop that is accessible by all context consumers.
    <AppStateContext.Provider value={{ lists, getTasksByListId }}>
      {children}
    </AppStateContext.Provider>
  );
};

// This function is the way that we gain access to the central App State.
export const useAppState = () => {
  // Remember, Typescript can automatically derive the return value of this func
  return useContext(AppStateContext);
};
