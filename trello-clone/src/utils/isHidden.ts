import { DragItem } from "../DragItem";

// Basic function that checks that the type and ids match the dragged item.
export const isHidden = (
  draggedItem: DragItem | null,
  itemType: string,
  id: string,
): boolean => {
  return Boolean(
    draggedItem && draggedItem.type === itemType && draggedItem.id === id
  );
}
