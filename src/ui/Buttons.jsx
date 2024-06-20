import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-red-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-500 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3",
    small: base + " px-3 py-2  text-xs mb-3",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-500 font-semibold uppercase tracking-wide text-stone-500 transition-colors duration-500 hover:bg-stone-500 hover:text-stone-800 focus:bg-stone-500 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
