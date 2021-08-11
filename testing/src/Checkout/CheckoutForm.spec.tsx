import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";
import { act } from "react-dom/test-utils";

describe("CheckoutForm", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />);

    expect(container.innerHTML).toMatch("Cardholder's Name");
    expect(container.innerHTML).toMatch("Card Number");
    expect(container.innerHTML).toMatch("Expiration Date");
    expect(container.innerHTML).toMatch("CVV");
  });

  describe("with validation errors", () => {
    it("renders error messages", async () => {
      const { container, getByText } = render(
        <CheckoutForm />
      );

      // act() is a special function that will lock the execution of the test
      // until changes happen to the page
      await act(async () => {
        fireEvent.click(getByText("Place order"));
      });

      expect(container.innerHTML).toMatch("Error:");
    });
    it.todo("disables submit button");
  });

  describe("without validation errors", () => {
    describe("on place order button click", () => {
      it("calls submit function with form data", async () => {
        const mockSubmit = jest.fn();

        const { getByLabelText, getByText } = render(
          <CheckoutForm submit={mockSubmit} />
        );

        await act(async() => {
          fireEvent.change(
            getByLabelText("Cardholder's Name:"),
            { target: { value: "Bibo Bobbins" } },
          );
          fireEvent.change(
            getByLabelText("Card Number:"),
            { target: { value: "0000 0000 0000 0000" } },
          );
          fireEvent.change(
            getByLabelText("Expiration Date:"),
            { target: { value: "3020-05" } },
          );
          fireEvent.change(
            getByLabelText("CVV:"),
            { target: { value: "123" } },
          );
        });

        await act(async () => {
          fireEvent.click(getByText("Place order"));
        });

        expect(mockSubmit).toHaveBeenCalled();
      });
      it.todo("clears cart");
      it.todo("redirects to order summary page");
    });
  });
});
