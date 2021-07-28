import { List } from "../state/appStateReducer";

type Item = {
  id: string,
};

// OK: Non-generic "find List by ID" function.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findListIndexById = (lists: List[], listId: string): number => {
  return lists.findIndex(list => list.id === listId);
};

// BETTER: Generic "find item by ID" function.
export const findItemIndexById = <TItem extends Item>(items: TItem[], itemId: string): number => {
  return items.findIndex(item => item.id === itemId);
};

// IDEA: I'm not entirely too sure on how important the "<TItem extends Item>"
// declaration is...
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _findItemIndexById = (items: Item[], itemId: string): number => {
  return items.findIndex(item => item.id === itemId);
};