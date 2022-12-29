import { ElementWithTeamName } from "../interfaces/element.interface";
import { useMemo } from "react";
import { usePlayersStore } from "../store/player.store";
import { useTeamStore } from "../store/team.store";

export default (): ElementWithTeamName[] => {
  const players = usePlayersStore((state) => state.players);
  const teams = useTeamStore((state) => state.teams);

  return useMemo(() => {
    if (players.length && teams.length) {
      return players.map((player) => {
        const playerTeam = teams.find((team) => team.code === player.team_code);
        if (playerTeam) {
          return {
            ...player,
            team_short_name: playerTeam.short_name,
          };
        }
        return player;
      });
    }
    return players;
  }, [players, teams]);
};
