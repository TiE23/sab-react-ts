import { ColumnContainer, ColumnTitle } from "./styles"
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { addTask } from "./state/actions";
import { useRef } from "react";
import { useItemDrag } from "./utils/useItemDrag";

type ColumnProps = {
  text: string,
  id: string,
};

// Do notice the naming here. Column.tsx is the parent of ColumnContainer.tsx.
export const Column = (props: ColumnProps) => {
  // This is us getting data (well, a function...) from AppState.
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(props.id);

  // The concept of ref is kinda strange. But essentially the ref is going to
  // be the DOM element that the dragging feature works on. But really, what
  // you do is give the target element the ref returned from the useRef() hook
  // and magic will happen: It will set itself as current (see how we set the
  // type as HTMLDivElement?)
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id: props.id, text: props.text});
  drag(ref);

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{props.text}</ColumnTitle>
      {tasks.map(task =>
        <Card text={task.text} key={task.id} id={task.id} />
      )}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch(addTask(text, props.id))}
        dark
      />
    </ColumnContainer>
  );
}
