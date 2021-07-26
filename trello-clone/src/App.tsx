// The writers suggest never using default exports for components as it will make
// any refactoring easier in the future. I think I'm inclined to agree.
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";

const myLog = (text: string) => {
  console.log('MyLog:', text);
}

export const App = () => (
  <AppContainer>
    <AddNewItem toggleButtonText="+ Add another list" onAdd={myLog} />
  </AppContainer>
);
