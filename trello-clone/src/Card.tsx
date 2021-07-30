import { useRef } from "react";
import { CardContainer } from "./styles"
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { useAppState } from "./state/AppStateContext";
import { isHidden } from "./utils/isHidden";
import { moveTask, setDraggedItem } from "./state/actions";

type CardProps = {
  text: string,
  id: string,
  columnId: string, // So the card knows who it belongs to. Much easier.
  isPreview?: boolean,
};

export const Card = (props: CardProps) => {
  // Read comments in Column.tsx for more details.
  const { draggedItem, dispatch } = useAppState();

  // Drag support.
  const { drag } = useItemDrag({
    type: "CARD",
    id: props.id,
    text: props.text,
    columnId: props.columnId,
  });

  // Drop support.
  const [, drop] = useDrop({
    accept: "CARD",
    hover() {
      if (!draggedItem) {
        return; // Nothing is being dragged!
      }
      if (draggedItem.type !== "CARD") {
        return; // Can't drop on anything that isn't a card!
      }
      if (draggedItem.id === props.id) {
        return; // Can't drop on itself!
      }

      dispatch(
        moveTask(
          draggedItem.id,       // Current dragged item
          props.id,             // This card as a recepient
          draggedItem.columnId, // The dragged item's originating column
          props.columnId,       // This card's column
        ),
      );
    },
  });
  const ref = useRef<HTMLDivElement>(null);

  drag(drop(ref));

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "CARD", props.id, props.isPreview)}
      isPreview={props.isPreview}
      ref={ref}
    >
      {props.text}
    </CardContainer>
  );
}
