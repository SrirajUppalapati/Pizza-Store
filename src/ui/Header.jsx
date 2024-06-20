import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-around border-b border-gray-700 bg-red-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="text-center text-2xl font-thin text-slate-100">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
