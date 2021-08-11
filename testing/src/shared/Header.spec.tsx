/**
 * This is testing the header component. Because we want to only test the
 * component by itself and remove any complications from other components we'll
 * have to mock them away.
 */
import React from "react";
import { Header } from "./Header";
import { fireEvent } from "@testing-library/react";

// We mock this, we don't want to deal with it.
jest.mock("./CartWidget", () => ({
  CartWidget: () => <div>Cart widget</div>,
}));


describe("Header", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => <Header />);

    // Basic! But it's the real component!
    expect(container.innerHTML).toMatch("Goblin Store");

    // It's good to have the mock tested, so we know it's still being used!
    expect(container.innerHTML).toMatch("Cart widget");
  });

  it("navigates to / on header title click", () => {
    // getByText is from the ...render!
    const { getByText, history } = renderWithRouter(() => <Header />);

    fireEvent.click(getByText("Goblin Store"));
    expect(history.location.pathname).toEqual("/");
  });
});