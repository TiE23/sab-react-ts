// The writers suggest never using default exports for components as it will make
// any refactoring easier in the future. I think I'm inclined to agree.
import { Card } from "./Card";
import { Column } from "./Column";
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { myLog } from "./utils";

export const App = () => (
  <AppContainer>
    <Column text="To Do">
      <Card text="Generate app scaffold" />
    </Column>
    <Column text="In Progress">
      <Card text="Learn Typescript" />
    </Column>
    <Column text="Done">
      <Card text="Begin to use static typing" />
    </Column>
    <Column>
      <Card text="Begin to use static typing" />
    </Column>
    <AddNewItem toggleButtonText="+ Add another list" onAdd={myLog} />
  </AppContainer>
);
