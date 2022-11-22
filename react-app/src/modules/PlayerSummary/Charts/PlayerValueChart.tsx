import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { ElementSummary } from "~/interfaces/elementSummary.interface";
import { usePlayersStore } from "../../../store/player.store";

const PlayerValueChart = () => {
  const {
    playerSummary: { history },
  } = useOutletContext<{ playerSummary: ElementSummary }>();

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        syncId="sync"
        width={500}
        height={300}
        data={history}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="round" />
        <YAxis
          label={{
            value: "Value",
            angle: -90,
            position: "left",
          }}
          domain={["auto", "auto"]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#7f1d1d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlayerValueChart;
