import { DragItem } from "../DragItem";

// Basic function that decides if an element in question should be hidden (when
// it is being dragged away).
export const isHidden = (
  draggedItem: DragItem | null, // State's dragged item ({type, id})
  itemType: string, // This component's type
  id: string, // This component's id
  isPreview?: boolean,  // Override, really, to make sure we don't disappear previews
): boolean => {
  return Boolean(
    !isPreview &&
    draggedItem &&
    draggedItem.type === itemType &&
    draggedItem.id === id
  );
};
