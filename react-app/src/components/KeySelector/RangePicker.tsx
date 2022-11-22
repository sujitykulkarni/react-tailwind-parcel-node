import React, { useCallback, useState } from "react";

const RangePicker = ({
  min,
  max,
  onChange,
}: Record<"min" | "max", number> & { onChange: (value: number) => void }) => {
  const [value, setValue] = useState(min);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseInt(event.target.value));
      setValue(parseInt(event.target.value));
    },
    [onChange, setValue]
  );
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        id="range"
        name="range"
      />
      <label htmlFor="range">{value}</label>
    </>
  );
};

export default RangePicker;
