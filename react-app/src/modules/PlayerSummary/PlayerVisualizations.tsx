import { isEmpty } from "lodash";
import React, { useCallback, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { usePlayersStore } from "../../store/player.store";

const PlayerVisualizations = () => {
  const { id } = useParams();
  const [summary, fetchSummary] = usePlayersStore((state) => [
    state.summary,
    state.fetchSummary,
  ]);

  const init = useCallback(() => {
    if (id) {
      if (isEmpty(summary) || !summary[id]) {
        fetchSummary(id);
      }
    }
  }, [fetchSummary, id, summary]);

  useEffect(init, []);
  if (!id) return null;
  if (!summary) return <span>Fetching player summary...</span>;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row sm:justify-center lg:justify-start sm:gap-1">
        {[
          { path: "pointspergw", label: "Points Per GW" },
          { path: "pointsvsopponent", label: "Points Vs Opponent Strength" },
          { path: "value", label: "Value" },
          { path: "transfers", label: "Transfers" },
          {
            path: "transfersvsopponent",
            label: "Transfers Vs Opponent Strength",
          },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${isActive ? "underline" : ""} px-2 py-1 rounded`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="grow-0">
        <Outlet context={{ playerSummary: summary[id] }} />
      </div>
    </div>
  );
};

export default PlayerVisualizations;
