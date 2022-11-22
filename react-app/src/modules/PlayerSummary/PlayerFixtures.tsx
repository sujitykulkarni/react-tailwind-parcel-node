import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ElementSummary,
  FixtureWithTeamShortNames,
} from "../../interfaces/elementSummary.interface";
import { Column } from "react-table";
import Table from "../../components/Table/Table";
import { useTeamStore } from "../../store/team.store";
import TimeAgo from "react-timeago";

const columnWidths = {
  minWidth: 200,
  maxWidth: 250,
};

export const PlayerFixtures = () => {
  const {
    playersSummary: { fixtures },
  } = useOutletContext<{ playersSummary: ElementSummary }>();

  const [teamStore] = useTeamStore((state) => [state.teams]);
  const fixturesWithTeamNames = useMemo(() => {
    if (teamStore.length && fixtures.length) {
      return fixtures.map((fixture) => {
        const home_team_short_name = teamStore.find(
          (team) => team.id === fixture.team_h
        )?.short_name;
        const away_team_short_name = teamStore.find(
          (team) => team.id === fixture.team_a
        )?.short_name;
        return {
          ...fixture,
          home_team_short_name,
          away_team_short_name,
        };
      });
    }
    return [];
  }, [teamStore, fixtures]);

  const columns: Column<FixtureWithTeamShortNames>[] = useMemo(
    () => [
      {
        Header: "Home Game",
        accessor: "is_home",
        Cell: ({ value }) => (value ? <span>Y</span> : <span>N</span>),
        ...columnWidths,
      },
      {
        Header: "Home Team",
        accessor: "home_team_short_name",
        ...columnWidths,
      },
      {
        Header: "Away Team",
        accessor: "away_team_short_name",
        ...columnWidths,
      },
      {
        Header: "Kickoff In",
        accessor: "kickoff_time",
        Cell: ({ value }) =>
          value && (
            <TimeAgo date={value} className="whitespace-normal break-words" />
          ),
        ...columnWidths,
      },
    ],
    []
  );

  if (!fixtures.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2>Remaining {fixtures.length} fixtures</h2>
      <Table<FixtureWithTeamShortNames>
        columns={columns}
        data={fixturesWithTeamNames}
      />
    </div>
  );
};
