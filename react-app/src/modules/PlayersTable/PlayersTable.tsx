import React, { useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { Link } from "react-router-dom";
import Table, {
  filterGreaterThan,
  SelectColumnFilter,
  SliderColumnFilter,
} from "../../components/Table/Table";
import {
  Element,
  ElementWithTeamName,
} from "../../interfaces/element.interface";
import { Team } from "../../interfaces/teams.interfaces";
import { sortBy } from "lodash";
import Card from "../../components/Card/Card";
import Stat from "../../components/Stat/Stat";
import Select from "../../components/Select/Select";
import { ELEMENT_STATS } from "../../constants";

const columnWidths = {
  minWidth: 50,
  maxWidth: 150,
};

const PlayersTable = ({
  teams,
  players,
}: {
  teams: Team[];
  players: ElementWithTeamName[];
}) => {
  const [selectedStat, setSelectedStat] = useState<string | undefined>();
  const columns: Column<Element & { team_short_name: string }>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "web_name",
        filter: "includes",
        Cell: ({ row, value }) => {
          return (
            <Link
              to={`/player/${row.original.id}`}
              state={{ playerInfo: row.original }}
              className="hover:text-blue-700"
            >
              {value}
            </Link>
          );
        },
        // ...columnWidths,
      },
      {
        Header: "Team",
        accessor: "team_short_name",
        Filter: SelectColumnFilter,
        // ...columnWidths,
      },
      {
        Header: "Form",
        accessor: "form",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Points",
        columns: [
          {
            Header: "Per Game",
            accessor: "points_per_game",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
          {
            Header: "Total",
            accessor: "total_points",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
        ],
      },
      {
        Header: "Selected %",
        accessor: "selected_by_percent",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Transfers",
        columns: [
          {
            Header: "This GW",
            columns: [
              {
                Header: "In",
                accessor: "transfers_in_event",
                Filter: SliderColumnFilter,
                filter: filterGreaterThan,
                sortDescFirst: true,
                // ...columnWidths,
              },
              {
                Header: "Out",
                accessor: "transfers_out_event",
                Filter: SliderColumnFilter,
                filter: filterGreaterThan,
                sortDescFirst: true,
                // ...columnWidths,
              },
            ],
          },
          {
            Header: "Total",
            columns: [
              {
                Header: "In",
                accessor: "transfers_in",
                Filter: SliderColumnFilter,
                filter: filterGreaterThan,
                sortDescFirst: true,
                // ...columnWidths,
              },
              {
                Header: "Out",
                accessor: "transfers_out",
                Filter: SliderColumnFilter,
                filter: filterGreaterThan,
                sortDescFirst: true,
                // ...columnWidths,
              },
            ],
          },
        ],
      },
      {
        Header: "Cost",
        columns: [
          {
            Header: "Current",
            accessor: "now_cost",
            Cell: ({ value }) => value / 10,
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
          {
            Header: "Cost Change since last GW",
            accessor: "cost_change_event",
            Cell: ({ value }) => value / 10,
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
        ],
      },
      {
        Header: "Minutes",
        accessor: "minutes",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Goals",
        columns: [
          {
            Header: "Scored",
            accessor: "goals_scored",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
          {
            Header: "Conceded",
            accessor: "goals_conceded",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
        ],
      },
      {
        Header: "Assists",
        accessor: "assists",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Own Goals",
        accessor: "own_goals",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        // ...columnWidths,
      },
      {
        Header: "Clean Sheets",
        accessor: "clean_sheets",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Penalties",
        columns: [
          {
            Header: "Saved",
            accessor: "penalties_saved",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            sortDescFirst: true,
            // ...columnWidths,
          },
          {
            Header: "Missed",
            accessor: "penalties_missed",
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
            // ...columnWidths,
          },
        ],
      },
      {
        Header: "Saves",
        accessor: "saves",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
      {
        Header: "Bonus",
        accessor: "bonus",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        sortDescFirst: true,
        // ...columnWidths,
      },
    ],
    []
  );

  const stats = useMemo(() => {
    const sorter = (key: keyof ElementWithTeamName) =>
      players.sort((a, b) => b[key] - a[key])[0];
    const topScorer = sorter("goals_scored");
    const topAssists = sorter("assists");
    const topSaves = sorter("saves");
    return {
      topScorer,
      topAssists,
      topSaves,
    };
  }, [players]);

  return (
    <Card
      title={
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row justify-between gap-6">
            <Stat
              label="👕 Players"
              value={players.length}
              tooltip="Total Players"
            />
            <Stat
              label={`⚽ ${stats.topScorer.web_name}`}
              value={stats.topScorer.goals_scored}
              tooltip="Top Scorer"
            />
            <Stat
              label={`👟 ${stats.topAssists.web_name}`}
              value={stats.topAssists.assists}
              tooltip="Top Assists"
            />
            <Stat
              label={`🧤 ${stats.topSaves.web_name}`}
              value={stats.topSaves.saves}
              tooltip="Top Saves"
            />
          </div>
          <Select
            label="Sort By"
            options={ELEMENT_STATS.map((col) => ({
              key: col.name,
              value: col.name,
              text: col.label,
            }))}
            onSelect={(value) => setSelectedStat(value)}
            selected={selectedStat}
          />
        </div>
      }
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="max-w-full max-h-full overflow-x-auto">
          <Table<Element>
            columns={columns}
            data={players}
            initialState={{
              sortBy: selectedStat
                ? [{ id: selectedStat, desc: true }]
                : [
                    {
                      id: "form",
                      desc: true,
                    },
                  ],
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default PlayersTable;
