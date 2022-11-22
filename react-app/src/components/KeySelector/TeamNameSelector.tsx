import React from "react";
import { Team } from "interfaces/teams.interfaces";

const TeamNameSelector = ({
  teams,
  onChange,
}: {
  teams: Team[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <select className="border" onChange={onChange}>
      <option value="">All</option>
      {teams.map((team) => (
        <option key={team.id} value={team.code}>
          {team.name}
        </option>
      ))}
    </select>
  );
};

export default TeamNameSelector;
