/*
  This is a tricky component that uses a div that takes up an entire page
  (CustomDragLayerContainer) and then has a child component (DragPreviewWrapper)
  magically fly around the screen depending on the X, Y coordinates gained from
  dnd.
*/
import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { Card } from "./Card";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles";
import { useAppState } from "./state/AppStateContext";

export const CustomDragLayer = () => {
  // Dragged item from state.
  const { draggedItem } = useAppState();

  // This hook lets us get info from Dnd's internal state.
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview
            />

        ) : (
          <Card
            columnId={draggedItem.columnId}
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
