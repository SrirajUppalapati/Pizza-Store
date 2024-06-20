import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalNoOfPizzas, getTotalPriceOfPizzas } from "./cartSlice";

function CartOverview() {
  const noOfPizza = useSelector(getTotalNoOfPizzas);

  const totalPrice = useSelector(getTotalPriceOfPizzas);

  if (!totalPrice) return null;
  return (
    <div className="flex items-center justify-between bg-gray-700 p-4 text-base text-gray-100">
      <p className="space-x-4">
        <span>{noOfPizza} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
