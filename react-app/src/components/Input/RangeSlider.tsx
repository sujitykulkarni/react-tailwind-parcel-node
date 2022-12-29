import React from "react";
import Input, { InputProps } from "./Input";

const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  label,
  ...rest
}: Omit<InputProps, "type">) => {
  return (
    <Input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      className="w-full h-7 text-sm align-middle appearance-none rounded-full bg-slate-100 border-gray-50 border-4 rounded-full-thumb rounded-full-track text-blue-700"
      label={label}
      {...rest}
    />
  );
};

export default RangeSlider;
