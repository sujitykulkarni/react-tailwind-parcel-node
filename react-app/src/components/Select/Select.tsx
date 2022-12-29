import React from "react";

type SelectOption = {
  key: React.Key;
  value: string;
  text?: React.ReactNode;
};

const Select = ({
  label,
  options,
  selected,
  onSelect,
}: {
  label?: React.ReactNode;
  options: SelectOption[];
  onSelect: (value?: string) => void;
  selected?: string;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };
  return (
    <div className="flex flex-row gap-2 items-center text-sm text-gray-500">
      <label className="inline-block text-xs">{label}</label>
      <select
        className="inline-block bg-slate-50 border-slate-100 focus:border-blue-100 border rounded-md px-2 py-1 w-full"
        onChange={handleChange}
        value={selected ?? ""}
      >
        {options.map(({ key, text, value }) => (
          <option key={key} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
