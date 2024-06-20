import { useDispatch } from "react-redux";
import Button from "../../ui/Buttons";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <div>
      <Button type="small" onClick={handleOnClick}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
