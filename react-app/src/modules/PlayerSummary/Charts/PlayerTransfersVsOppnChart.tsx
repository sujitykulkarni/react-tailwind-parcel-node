import { reduce, sortBy } from "lodash";
import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ScatterChart,
  CartesianGrid,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  ElementSummary,
  ElementStatsByOpponentStrength,
} from "~/interfaces/elementSummary.interface";

const PlayerTransfersVsOppnChart = () => {
  const {
    playerSummary: {
      stats: { opponent_strength_stats },
    },
  } = useOutletContext<{ playerSummary: ElementSummary }>();

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        width={500}
        height={400}
        margin={{
          top: 10,
          right: 50,
          bottom: 50,
          left: 50,
        }}
      >
        <XAxis
          dataKey="transfers_in"
          name="Transfers In"
          domain={[0, "dataMax"]}
          scale="linear"
          label={{
            value: "Transfers In",
            position: "bottom",
            offset: -45,
          }}
        />
        <YAxis
          dataKey="transfers_out"
          name="Transfers Out"
          scale="linear"
          label={{
            value: "Transfers Out",
            position: "insideLeft",
            angle: -90,
            offset: -25,
          }}
        />
        <ZAxis
          dataKey="opponent_strength"
          name="Opponent Strength"
          range={[20, 400]}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Opponent Strength"
          data={sortBy(opponent_strength_stats, "transfers_in")}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PlayerTransfersVsOppnChart;
