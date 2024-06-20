import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="space-y-24 p-4">
      <Link
        to="/menu"
        className="text-sm text-blue-800 hover:text-blue-400 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <p className="text-xl font-bold">
        Your cart is still empty. Start adding some pizzas 😔
      </p>
    </div>
  );
}

export default EmptyCart;
