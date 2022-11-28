import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

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
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ScoreGroupPie;
