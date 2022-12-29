import React from "react";

export const Avatar = ({ path }: { path: string }) => {
  return (
    <img
      src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${path.replace(
        "jpg",
        "png"
      )}`}
      className="w-100 h-full object-fill mb-3 rounded-full drop-shadow-xl border-4 border-slate-50"
    />
  );
};
