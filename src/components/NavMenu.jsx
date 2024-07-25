import { Link } from "react-router-dom";

export default function NavMenu({ to, children, isActive }) {
  return (
    <Link to={to}>
      <div
        className={`flex gap-1.5 p-2 rounded-l-full items-center ${
          isActive ? "bg-white" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full ${
            isActive ? "bg-neutral-100" : "bg-white"
          }`}
        ></div>
        <p className="font-semibold">{children}</p>
      </div>
    </Link>
  );
}
