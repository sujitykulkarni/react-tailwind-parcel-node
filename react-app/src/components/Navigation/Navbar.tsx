import React from "react";
import { NavLink } from "react-router-dom";

/**
 * @description Navbar component props
 * @interface NavbarProps
 */
interface NavbarProps {
  links: Record<"path" | "label", string>[];
}

/**
 * Navbar component
 * @param {NavbarProps} props - Navbar component props
 * @returns {React.ReactNode} Navbar component
 */
export const Navbar = ({ links }: NavbarProps): React.ReactNode => {
  return (
    <nav className="flex flex-row sm:justify-center lg:justify-start max-w-full py-2">
      <ul className="inline-flex gap-2">
        {links.map((item) => (
          <li key={item.label.trim()} className="">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-400 text-white" : "bg-blue-200"
                } px-2 py-1 rounded`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
