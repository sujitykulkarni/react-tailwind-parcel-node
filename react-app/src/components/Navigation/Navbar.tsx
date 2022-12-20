import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

/**
 * @description Navbar component props
 * @interface NavbarProps
 */
interface NavbarProps {
  links: Array<
    Record<"path" | "label", string> & { icon?: React.ReactNode; end?: boolean }
  >;
  secondary?: boolean;
}

/**
 * Navbar component
 * @param {NavbarProps} props - Navbar component props
 * @returns {JSX.Element} Navbar component
 */
export const Navbar = ({ links, secondary }: NavbarProps): JSX.Element => {
  const navClasses = classNames(
    "flex flex-row justify-between max-w-full py-4 px-2 gap-2 rounded-lg",
    {
      "bg-slate-50": !secondary,
      "bg-transparent": secondary,
      shadow: !secondary,
      "border-slate-100": secondary,
      border: secondary,
    }
  );

  return (
    <nav className={navClasses}>
      <ul className="inline-flex gap-2">
        {links.map((item) => (
          <li key={item.label.trim()}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `p-2 rounded text-blue-500 ${
                  isActive
                    ? secondary
                      ? "bg-stone-400 text-slate-50"
                      : "bg-blue-400 text-slate-50"
                    : undefined
                }`
              }
              end={item.end}
            >
              {item.icon ?? null}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {!secondary && (
        <h1 className="px-2 font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500 antialiased">
          FOOSTAVIZ
        </h1>
      )}
    </nav>
  );
};
