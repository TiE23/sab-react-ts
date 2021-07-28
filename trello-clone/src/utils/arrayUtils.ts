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

// Not too complicated a function. Moving truthfully involves removing an item
// from one array and adding an item to another. So, but dealing with separate
// arrays directly (not by reference, mutating them or anything...) we combine
// two functions together.
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};

export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  // I figure this is a normal function because it is static.
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insertItemAtIndex<TItem>(
  array: TItem[],
  item: TItem,
  index: number,
) {
  return [...array.slice(0, index), item, ...array.slice(index)];
}
