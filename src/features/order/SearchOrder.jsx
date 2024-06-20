import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your order number: #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="foc w-72 rounded-full bg-red-400 p-2 text-sm font-semibold text-slate-100 transition-all placeholder:text-slate-200 focus:outline-none focus:ring focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
