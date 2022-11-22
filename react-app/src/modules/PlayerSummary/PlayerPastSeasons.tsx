import { startCase } from "lodash";
import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../components/Table/Table";
import {
  ElementSummary,
  HistoryPast,
} from "~/interfaces/elementSummary.interface";

const columnWidths = {
  minWidth: 80,
  maxWidth: 100,
};

const PlayerPastSeasons = () => {
  const {
    playersSummary: { history_past },
  } = useOutletContext<{ playersSummary: ElementSummary }>();
  const columns: Column<HistoryPast>[] = useMemo(
    () => [
      {
        Header: "Season",
        accessor: "season_name",
        ...columnWidths,
      },
      {
        Header: "Cost",
        columns: [
          {
            Header: "Start",
            accessor: "start_cost",
            Cell: ({ value }) => <span>{value / 10}</span>,
            ...columnWidths,
          },
          {
            Header: "End",
            accessor: "end_cost",
            Cell: ({ value }) => <span>{value / 10}</span>,
            ...columnWidths,
          },
        ],
      },
      {
        Header: "Goals",
        columns: [
          {
            Header: "Scored",
            accessor: "goals_scored",
            ...columnWidths,
          },
          {
            Header: "Conceded",
            accessor: "goals_conceded",
            ...columnWidths,
          },
          {
            Header: "Assists",
            accessor: "assists",
            ...columnWidths,
          },
        ],
      },
      {
        Header: "Points",
        accessor: "total_points",
        ...columnWidths,
      },
      {
        Header: "Minutes",
        accessor: "minutes",
        ...columnWidths,
      },

      {
        Header: "Clean Sheets",
        accessor: "clean_sheets",
        ...columnWidths,
      },
      {
        Header: "Pen Saved",
        accessor: "penalties_saved",
        ...columnWidths,
      },
      {
        Header: "Pen Missed",
        accessor: "penalties_missed",
        ...columnWidths,
      },
      {
        Header: "Bonus",
        accessor: "bonus",
        ...columnWidths,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <h2>In his last {history_past.length} seasons</h2>
      <Table<HistoryPast> columns={columns} data={history_past} />
    </div>
  );
};

export default PlayerPastSeasons;
