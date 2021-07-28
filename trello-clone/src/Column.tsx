import { ColumnContainer, ColumnTitle } from "./styles"
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";

import { myLog } from './utils/utils';

type ColumnProps = {
  text: string,
  id: string,
};

export const Column = (props: ColumnProps) => {
  // This is us getting data (well, a function...) from AppState.
  const { getTasksByListId } = useAppState();

  const tasks = getTasksByListId(props.id);

  return (
    <ColumnContainer>
      <ColumnTitle>{props.text}</ColumnTitle>
      {tasks.map(task =>
        <Card text={task.text} key={task.id} id={task.id} />
      )}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={myLog}
        dark
      />
    </ColumnContainer>
  );
}
