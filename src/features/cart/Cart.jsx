import { Link } from "react-router-dom";
import Username from "../user/Username";
import Button from "../../ui/Buttons";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-3 my-2">
      <Link
        to="/menu"
        className="text-sm text-blue-800 hover:text-blue-400 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-5 flex items-stretch text-lg font-semibold">
        Your cart, {<Username />}
      </h2>
      <ul className="divide mt-4 divide-y-2 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-4 space-x-4">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
