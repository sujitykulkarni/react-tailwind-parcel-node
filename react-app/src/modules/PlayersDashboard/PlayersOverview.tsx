import React from "react";
import usePlayersWithTeamName from "../../hooks/usePlayersWithTeamName";
import { useTeamStore } from "../../store/team.store";
import PlayersTable from "../PlayersTable/PlayersTable";

const PlayersOverview = () => {
  const teamStore = useTeamStore((state) => state.teams);

  const playersWithTeamName = usePlayersWithTeamName();

  return <PlayersTable teams={teamStore} players={playersWithTeamName} />;
};

export default PlayersOverview;
