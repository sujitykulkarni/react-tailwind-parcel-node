import React from "react";

const Stat = ({
  label,
  value,
  tooltip,
}: {
  label?: string;
  value: string | number;
  tooltip?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap" title={tooltip}>
      <div className="text-2xl text-gray-700 font-bold antialiased proportional-nums">
        {value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

export default Stat;
