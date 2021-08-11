import React from "react"
import { Link } from "react-router-dom"
import cart from "./cart.svg"
import { useCartContext } from "../../CartContext"

/**
 * Using the Pick<Type, Keys> TS utility type with ReturnType<Type> we
 * essentially say that we want to "pick" the type titled "products" that is
 * _returned_ from typeof useCart.
 * It's a really crazy way of specifying exactly what you want to use. This is
 * a way to alleviate the burden of testing.
 * I don't know if I like it all that much because it hides the properties
 * available to us from useCart - so further work on this component will just be
 * a little more confusing to less-familiar developers.
 */
interface CartWidgetProps {
  // useCartHook?: typeof useCart;
  useCartHook?: () => Pick<ReturnType<typeof useCartContext>, "products">;
};

/* Here we're defining a DEFAULT value (with the = sign!), the useCart we
 * imported. This allows us
 * to override the context - great for testing!
 */
export const CartWidget = ({ useCartHook = useCartContext }: CartWidgetProps) => {
  const { products } = useCartHook();

  return (
    <Link to="/cart" className="nes-badge is-icon">
      <span className="is-error">{products?.length || 0}</span>
      <img src={cart} width="64" height="64" alt="cart" />
    </Link>
  )
}
