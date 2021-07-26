import { ColumnContainer, ColumnTitle } from "./styles"
import { AddNewItem } from "./AddNewItem";
import { FC } from "react";

import { myLog } from './utils';

type ColumnProps = {
  text?: string,
// } & {
  children?: React.ReactNode,
};

export const Column: FC<ColumnProps> = (props: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{props?.text ?? "Unknown Column"}</ColumnTitle>
      {props.children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={myLog}
        dark
      />
    </ColumnContainer>
  );
}
