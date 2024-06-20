/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPriceOfPizzas } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);

  const totalPrice = useSelector(getTotalPriceOfPizzas);

  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;

  const finalPrice = totalPrice + priorityPrice;

  const navigation = useNavigation();
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);

  const adressStatus = useSelector((state) => state.user.status);

  const address = useSelector((state) => state.user.address);

  const isLoadingAddressStatus = adressStatus === "loading" ? true : false;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-4">
      <h2 className="mb-7 text-xl">Ready to order? Lets go!</h2>
      <Form method="POST">
        <div className="mb-2 flex flex-col gap-2">
          <label>First Name</label>

          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="mb-2 flex flex-col gap-2">
          <label>Phone number</label>
          <input type="tel" name="phone" required className="input" />
        </div>

        {formErrors?.phone && (
          <p className="text-xs font-bold text-red-600">{formErrors.phone}</p>
        )}
        <div className="mb-2 flex flex-col gap-2">
          <label>Address</label>
        </div>

        <div className="relative flex items-center justify-around gap-2">
          <input
            type="text"
            name="address"
            required
            className="input"
            defaultValue={address}
            disabled={isLoadingAddressStatus}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress());
            }}
            className="absolute right-3"
            disabled={isLoadingAddressStatus}
          >
            🔍
          </button>
        </div>
        {adressStatus === "error" && (
          <p className="mt-2 text-xs font-bold text-red-600">
            Couldnt fetch the address!
          </p>
        )}

        <div className="m-2 flex items-center space-x-2">
          <input
            className="h-auto w-auto accent-red-300 outline-none focus:outline-none focus:ring focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Want to yo give your order priority for 20% of oyur order?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button
            disabled={
              navigation.state === "submitting" ||
              navigation.state === "loading"
            }
            type="primary"
          >
            Order now for {formatCurrency(finalPrice)} worth!
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us your correct phone number!";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
