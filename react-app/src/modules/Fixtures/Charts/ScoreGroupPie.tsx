import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "../../../constants";

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
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Legend verticalAlign="top" iconType={"circle"} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ScoreGroupPie;
