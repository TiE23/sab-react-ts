import React from "react";
import { App } from "./App";
import { createMemoryHistory } from 'history';  // This is an extra library.
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";

// This mocks Home.tsx and returns <div>Home</div> in its place.
jest.mock("./Home", () => ({ Home: () => <div>Home</div>}));

describe("App", () => {
  it("renders successfully", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    // https://jestjs.io/docs/expect
    expect(container.innerHTML).toMatch('Goblin Store');
  });

  it("renders Home component on root route", () => {
    const history = createMemoryHistory();
    history.push("/");

    /* The home component relies on ProductsProvider, so, we need to just
    mock the component instead.
     */
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch("Home");
  });
});
