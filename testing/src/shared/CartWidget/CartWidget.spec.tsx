import React from "react";
import { CartWidget } from './CartWidget'
import { fireEvent } from "@testing-library/react";

// Be aware. If tests don't run there might be a sneaky issue at play. For
// example. I forgot a "../" when importing this. So, my tests were all "?".
import "../../testHelpers";

describe("CartWidget", () => {
  it("shows the amount of products in the cart", () => {
    // This becomes acceptable when we do the magic with Pick<> and ReturnType<>
    // in the CartWidget component.
    const stubCartHook = () => ({
      products: [
        {
          name: "Product foo",
          price: 0,
          image: "image.png",
        },
      ],
    });

    const { container } = renderWithRouter(() => (
      <CartWidget useCartHook={stubCartHook} />
    ));

    expect(container.innerHTML).toMatch("1");
  });

  it("navigates to the cart summary page on click", () => {
    // Another example of a finding function, getByRole.
    // https://testing-library.com/docs/queries/about/#byrole
    const { getByRole, history } = renderWithRouter(() => <CartWidget />);

    fireEvent.click(getByRole("link"));

    expect(history.location.pathname).toEqual("/cart");
  });
});
