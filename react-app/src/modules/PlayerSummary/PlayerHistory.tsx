import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ElementSummary,
  ElementHomeVsAwayStat,
} from "../../interfaces/elementSummary.interface";
import { Column } from "react-table";
import Table from "../../components/Table/Table";
import startCase from "lodash/startCase";

const columnWidths = {
  minWidth: 200,
  maxWidth: 250,
};

const PlayerHistory = () => {
  const {
    playersSummary: {
      history,
      stats: { home_vs_away },
    },
  } = useOutletContext<{ playersSummary: ElementSummary }>();

  const columns: Column<ElementHomeVsAwayStat>[] = useMemo(
    () => [
      {
        Header: "Stat",
        accessor: "stat_key",
        Cell: ({ value }) => startCase(value),
        ...columnWidths,
      },
      {
        Header: "Home",
        accessor: "home",
        Cell: ({ row, value }) =>
          value > row.original.away ? (
            <span className="font-bold text-green-500">{value}</span>
          ) : (
            value
          ),
        ...columnWidths,
      },
      {
        Header: "Away",
        accessor: "away",
        Cell: ({ row, value }) =>
          value > row.original.home ? (
            <span className="font-bold text-green-500">{value}</span>
          ) : (
            value
          ),
        ...columnWidths,
      },
      {
        Header: "Total",
        Cell: ({ row }) => row.original.home + row.original.away,
        ...columnWidths,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-2">
      <h2>In his last {history.length} matches</h2>
      <Table<ElementHomeVsAwayStat> columns={columns} data={home_vs_away} />
    </div>
  );
};

export default PlayerHistory;
