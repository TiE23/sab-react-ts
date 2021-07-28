import { useDrag } from "react-dnd";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../state/actions";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  /*
    This function hook returns three values inside the array (we only grab [1]).
    [0]: Collected Props: An object containing collected properties from the
          collect function. If no collect function is defined, an empty object
          is returned.
    [1]: DragSource Ref: A connector function for the drag SOURCE. This MUST be
          attached to the draggable portion of the DOM.
    [2]: DragPreview Ref: A connector function for the drag preview. This MAY be
          attached to the preview portion of the DOM.
    The destructuring method of [, drag] is a fun way to grab and name a returned
    value what we want. :) No need for [_, drag] or anything like that!
  */
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item)); // Updating state. This is extra.
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),  // Updating state.
  });

  return { drag };
};
