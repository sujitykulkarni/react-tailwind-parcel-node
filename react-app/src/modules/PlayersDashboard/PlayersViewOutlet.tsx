import React, { Suspense, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usePlayersStore } from "../../store/player.store";
import { Navbar } from "../../components/Navigation/Navbar";
import { useTeamStore } from "../../store/team.store";

const PlayersViewOutlet = () => {
  const [playersStore, fetchPlayers] = usePlayersStore((state) => [
    state.players,
    state.fetchPlayers,
  ]);

  const [teamStore, fetchTeams] = useTeamStore((state) => [
    state.teams,
    state.fetchTeams,
  ]);

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

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <Navbar
        links={[
          { path: "overview", label: "Overview", end: true },
          {
            path: "segment/top/5/goals_scored",
            label: "Segments",
            end: true,
          },
        ]}
        secondary
      />
      <div className="w-full max-w-full">
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default PlayersViewOutlet;
