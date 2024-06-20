import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getCurrentQuantityById,
  increaseQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex gap-x-2">
      <button
        className="mb-3 rounded-full bg-red-500 p-1 text-sm font-bold disabled:bg-red-300"
        onClick={() =>
          currentQuantity > 0 && dispatch(decreaseQuantity(pizzaId))
        }
        disabled={currentQuantity === 1 && true}
      >
        -
      </button>
      <p className="text-lg font-semibold">{currentQuantity}</p>
      <button
        className="mb-3 rounded-full bg-red-500 p-1 text-sm font-bold"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
