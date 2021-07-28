import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
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
        <Column
          id={draggedItem.id}
          text={draggedItem.text}
          isPreview
          />
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
