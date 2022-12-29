import classNames from "classnames";
import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ className, label, ...props }) => {
  const classes = classNames(className, "border border-slate-100 p-0.5");
  return (
    <div className="flex flex-row gap-2 items-center">
      {label && (
        <label className="inline-block text-xs font-light">{label}</label>
      )}
      <input className={classes} {...props} />
    </div>
  );
};

export default Input;
