import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#c4b5fd",
  "#fb7185",
  "#14b8a6",
  "#ef4444",
  "#ea580c",
  "#b45309",
];

const ScoreGroupPie = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={150}
          outerRadius={175}
          fill="#82ca9d"
          label
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" iconType={"circle"} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ScoreGroupPie;
