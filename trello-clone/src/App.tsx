// The writers suggest never using default exports for components as it will make
// any refactoring easier in the future. I think I'm inclined to agree.

import { AppContainer } from "./styles";

export const App = () => {
  return (
    <AppContainer>
      Columns will go here.
    </AppContainer>
  );
}

