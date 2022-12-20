import React from "react";

const Card: React.FunctionComponent<
  React.PropsWithChildren & { title?: React.ReactNode }
> = ({ children, title }) => {
  return (
    <div className="rounded-md border border-stone-200 shadow-md">
      {title && (
        <div className="bg-stone-50 border-stone-200 p-4 rounded-t-md border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
