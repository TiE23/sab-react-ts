import { ColumnContainer, ColumnTitle } from "./styles"
import { FC } from "react";

type ColumnProps = {
  text?: string,
// } & {
  children?: React.ReactNode,
};

export const Column: FC<ColumnProps> = (props: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{props?.text ?? "Column Title"}</ColumnTitle>
    </ColumnContainer>
  );
}
