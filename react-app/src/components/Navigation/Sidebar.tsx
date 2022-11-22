import classNames from "classnames";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const globalNavLinks = [
  { path: "/", label: "Home" },
  { path: "/fixtures", label: "Fixtures" },
  { path: "/notes", label: "Set Piece Notes" },
];
const Sidebar: React.FunctionComponent<{
  links?: Record<"path" | "label", string>[];
  direction?: "row" | "col";
}> = React.memo(({ links = globalNavLinks, direction = "col" }) => {
  const navigate = useNavigate();
  const asideClasses = classNames(
    "flex flex-row justify-start gap-2 p-2 bg-slate-700 shadow-md w-full flex-none"
  );
  return (
    <aside className={asideClasses}>
      <button
        className="hover:bg-gray-500 rounded px-3 py-2 text-white"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {links.map(({ path, label }) => (
        <NavLink
          key={label.trim()}
          to={path}
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-900" : "bg-gray-600"
            }  hover:bg-slate-500 text-white px-3 py-2 rounded text-center font-medium`
          }
        >
          {label}
        </NavLink>
      ))}
    </aside>
  );
});

export default Sidebar;
