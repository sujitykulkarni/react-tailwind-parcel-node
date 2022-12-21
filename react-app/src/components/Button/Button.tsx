import classNames from "classnames";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: "primary" | "secondary" | "success" | "error" | "warning";
};

const Button: React.FC<ButtonProps> = ({
  className,
  intent = "secondary",
  ...props
}) => {
  const classes = classNames(
    "p-3 rounded-md text-base text-white active:bg-stone-300 hover:shadow-lg hover:shadow-indigo-500/40 ",
    className,
    {
      "bg-primary": intent === "primary",
      "bg-secondary": intent === "secondary",
      "bg-success": intent === "success",
      "bg-warning": intent === "warning",
      "bg-error": intent === "error",
      "bg-stone-100": !intent,
    }
  );
  return <button {...props} className={classes} />;
};

export default Button;
