import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Buttons";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="mb-4 mt-10 gap-y-4 text-center">
      <h1 className="mb-10 text-xl font-semibold text-stone-700">
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="menu" type="primary">
          Continue Ordering {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
