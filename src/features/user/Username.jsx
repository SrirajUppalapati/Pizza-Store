import { useSelector } from "react-redux";

function Username() {
  const name = useSelector((state) => state.user.username);
  if (name === null) return;
  return <div className="ml-2 text-lg font-semibold">{name}</div>;
}

export default Username;
