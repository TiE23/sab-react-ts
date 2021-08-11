import React from "react";
import { App } from "./App";
import { createMemoryHistory } from 'history';  // This is an extra library.
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";

// This mocks Home.tsx and returns <div>Home</div> in its place.
jest.mock("./Home", () => ({ Home: () => <div>Home</div>}));
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div>}));
jest.mock("./Checkout", () => ({ Checkout: () => <div>Checkout</div>}));
jest.mock("./OrderSummary", () => ({ OrderSummary: () => <div>Order summary</div>}));

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

describe("Routing", () => {
  // We use our cool global helper function renderWithRouter().
  it("renders home page on '/'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/",
    );
    expect(container.innerHTML).toMatch("Home");
  });
  it("renders cart page on '/cart'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/cart",
    );
    expect(container.innerHTML).toMatch("Cart");
  });
  it("renders checkout page on '/checkout'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/checkout",
    );
    expect(container.innerHTML).toMatch("Checkout");
  });
  it("renders summary page on '/order'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/order",
    );
    expect(container.innerHTML).toMatch("Order summary");
  });
  it("renders 'page not found' message on nonexistent route", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/foo-xyz",
    );
    expect(container.innerHTML).toMatch("Page not found");
  });
});
