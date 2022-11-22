import React from "react";
import { useOutletContext } from "react-router-dom";
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

const PlayerTransfersChart = () => {
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
          label={{ value: "Transfers", angle: -90, position: "left" }}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="transfers_balance"
          stroke="#64748b"
          strokeDasharray="5 5"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="transfers_in"
          stroke="#44403c"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="transfers_out"
          stroke="#4d7c0f"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PlayerTransfersChart;
