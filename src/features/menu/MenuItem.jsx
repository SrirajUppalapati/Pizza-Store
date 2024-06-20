/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function handleOnClick() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex items-center justify-between gap-4 p-4">
      <img
        className={`h-24 ${soldOut ? "inset-0 bg-gray-200 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p className="text-xs capitalize italic">{ingredients.join(", ")}</p>

        <div className="mt-auto uppercase">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>

      {isInCart && (
        <>
          <UpdateItemQuantity pizzaId={id} />
          <DeleteItem pizzaId={id} />
        </>
      )}

      {!isInCart && !soldOut && (
        <Button type="small" onClick={handleOnClick}>
          Add to Cart
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
