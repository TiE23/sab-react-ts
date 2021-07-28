import { ColumnContainer, ColumnTitle } from "./styles"
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Card } from "./Card";
import { moveList, addTask } from "./state/actions";
import { useRef } from "react";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
  text: string,
  id: string,
  isPreview?: boolean,
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
  const [, drop] = useDrop({
    accept: "COLUMN", // The kind of items the drop will accept.
    hover() { // Triggered whenever you move a item over it. Even if you can't drop!
      if (!draggedItem) {
        return; // State says there's nothing being dragged. So, don't do anything.
      }
      if (draggedItem.type === "COLUMN") {
        // Another check for matching type I guess?
        if (draggedItem.id === props.id) {
          // Can't drag and drop on itself!
          return;
        }

        // Okay, let's dispatch a move command!
        dispatch(moveList(draggedItem.id, props.id));
      }
    }
  })
  const { drag } = useItemDrag({ type: "COLUMN", id: props.id, text: props.text});

  drag(drop(ref));  // Combined to support both drag and drop on this component!

  return (
    <ColumnContainer
      ref={ref}
      isPreview={props.isPreview}
      isHidden={isHidden(draggedItem, "COLUMN", props.id, props.isPreview)}
    >
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
