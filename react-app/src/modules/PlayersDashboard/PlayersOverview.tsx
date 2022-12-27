import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ElementWithTeamName } from "../../interfaces/element.interface";
import { usePlayersStore } from "../../store/player.store";
import { useTeamStore } from "../../store/team.store";
import PlayersTable from "../PlayersTable/PlayersTable";

const PlayersOverview = () => {
  const [playersStore, fetchPlayers] = usePlayersStore((state) => [
    state.players,
    state.fetchPlayers,
  ]);

  const [teamStore, fetchTeams] = useTeamStore((state) => [
    state.teams,
    state.fetchTeams,
  ]);

  const playersWithTeamName = useMemo<ElementWithTeamName[]>(() => {
    if (playersStore.length && teamStore.length) {
      return playersStore.map((player) => {
        const playerTeam = teamStore.find(
          (team) => team.code === player.team_code
        );
        if (playerTeam) {
          return {
            ...player,
            team_short_name: playerTeam.short_name,
          };
        }
        return player;
      });
    }
    return playersStore;
  }, [playersStore, teamStore]);

  const loadData = useCallback(async () => {
    await fetchPlayers();
    await fetchTeams();
  }, [fetchPlayers, fetchTeams]);

  const init = useCallback(() => {
    if (!playersStore.length && !teamStore.length) {
      loadData();
    }
  }, [playersStore, teamStore, loadData]);

  useEffect(init, []);

  if (!playersStore.length && !teamStore.length)
    return <div>Fetching players and teams...</div>;

  return <PlayersTable teams={teamStore} players={playersWithTeamName} />;
};

export default PlayersOverview;
