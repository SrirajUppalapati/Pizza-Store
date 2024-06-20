import { useNavigate, useRouteError } from "react-router-dom";
import Header from "./Header";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>

      <p>{error.data || error.message}</p>
      <button
        className="text-sm text-blue-800 hover:text-blue-400 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
