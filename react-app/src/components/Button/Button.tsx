import classNames from "classnames";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  const classes = classNames(
    "p-2 rounded text:white hover:text-blue-500 bg-stone-100 border-b-2 border-r-2 border-stone-200 active:bg-stone-300",
    className
  );
  return <button {...props} className={classes} />;
};

export default Button;
