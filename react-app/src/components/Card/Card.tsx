import classNames from "classnames";
import React from "react";

const Card: React.FunctionComponent<
  React.PropsWithChildren &
    Omit<React.HTMLProps<HTMLDivElement>, "title"> & {
      title?: string | React.ReactElement;
      bodyClasses?: string;
    }
> = ({ children, title, className, bodyClasses, ...restDivProps }) => {
  const classes = classNames(
    className,
    "rounded-md border border-stone-200 shadow-md min-w-content"
  );
  return (
    <div {...restDivProps} className={classes}>
      {title && (
        <div className="bg-stone-50 border-stone-200 p-4 rounded-t-md border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className={`p-4 ${bodyClasses}`}>{children}</div>
    </div>
  );
};

export default Card;
