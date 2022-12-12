import React, { useCallback, useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { usePlayersStore } from "../../store/player.store";
import { useTeamStore } from "../../store/team.store";
import { isEmpty } from "lodash";
import { ELEMENT_TYPE } from "../../constants";
import { Navbar } from "../../components/Navigation/Navbar";

/**
 * Renders a player's summary data
 * @returns
 */
const PlayerSummary = () => {
  const { id } = useParams();
  const [playersStore, summaryStore, fetchPlayers, fetchSummary] =
    usePlayersStore((state) => [
      state.players,
      state.summary,
      state.fetchPlayers,
      state.fetchSummary,
    ]);
  const [teamsStore, fetchTeams] = useTeamStore((state) => [
    state.teams,
    state.fetchTeams,
  ]);
  const selectedPlayer = useMemo(() => {
    if (playersStore.length) {
      return playersStore.find((player) => player.id.toString() === id);
    } else {
      fetchPlayers();
      return null;
    }
  }, [playersStore, id, fetchPlayers]);

  const selectedPlayerTeam = useMemo(() => {
    if (teamsStore.length && selectedPlayer) {
      return teamsStore.find((team) => team.code === selectedPlayer.team_code);
    }
    if (!teamsStore.length) {
      fetchTeams();
    }
    return null;
  }, [teamsStore, selectedPlayer, fetchTeams]);

  const init = useCallback(() => {
    if (id) {
      if (isEmpty(summaryStore) || !summaryStore[id]) {
        fetchSummary(id);
      }
    }
  }, [summaryStore, fetchSummary, id]);

  useEffect(init, []);

  if (!id) return null;

  return (
    <div className="flex sm:flex-col lg:flex-row items-stretch gap-2">
      {selectedPlayer && (
        <div className="flex sm:flex-row lg:flex-col sm:justify-center lg:justify-start items-center flex-none bg-slate-100 lg:min-h-screen lg:max-h-screen">
          <img
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${selectedPlayer.photo.replace(
              "jpg",
              "png"
            )}`}
            className="sm:w-1/6 lg:w-full"
          />
          <div className="flex sm:flex-col p-2 box-border">
            <h1 className="text-2xl">
              {selectedPlayer.first_name} {selectedPlayer.second_name}
            </h1>
            {selectedPlayerTeam && (
              <span className="ml-1">({selectedPlayerTeam.name})</span>
            )}
            <div>{ELEMENT_TYPE[selectedPlayer.element_type - 1]}</div>
          </div>
        </div>
      )}
      <div className="flex flex-col grow-0 gap-8 w-full">
        <Navbar
          links={[
            { path: "homeaway", label: "Home Vs Away Record" },
            { path: "fixtures", label: "Remaining Fixtures" },
            { path: "past", label: "Past Seasons" },
            { path: "visualizations", label: "Visualizations" },
          ]}
        />
        {summaryStore[id] && (
          <Outlet context={{ playersSummary: summaryStore[id] }} />
        )}
      </div>
    </div>
  );
};

export default PlayerSummary;
