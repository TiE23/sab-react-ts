// The writers suggest never using default exports for components as it will make
// any refactoring easier in the future. I think I'm inclined to agree.
import { Column } from "./Column";
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { myLog } from "./utils/utils";
import { useAppState } from "./state/AppStateContext";

export const App = () => {
  const { lists } = useAppState();

  return (
    <AppContainer>
      {lists.map((list) =>
        <Column text={list.text} key={list.id} id={list.id} />
      )}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={myLog} />
    </AppContainer>
  );
  }
