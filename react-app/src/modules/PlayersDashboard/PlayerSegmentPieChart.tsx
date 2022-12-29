import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import {
  ElementWithTeamName,
  Element,
} from "../../interfaces/element.interface";
import { CHART_COLORS } from "../../constants";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import sumBy from "lodash/sumBy";

const PlayerSegmentPieChart = ({
  data,
  criteria,
}: {
  data: Pick<
    ElementWithTeamName,
    "team_short_name" | keyof Required<Element>
  >[];
  criteria: keyof Required<Element>;
}) => {
  const groupedData = useMemo(() => {
    const groupedData = groupBy(data, "team_short_name");
    const sumObject = mapValues(
      groupedData,
      (arr) => sumBy(arr, criteria) / arr.length
    );
    const sumArray = Object.keys(sumObject).map((key) => ({
      label: key,
      value: sumObject[key],
    }));
    return sumArray;
  }, [data, criteria]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={300} height={300}>
        <Pie
          data={groupedData}
          dataKey="value"
          nameKey="label"
          innerRadius={100}
          outerRadius={125}
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

export default PlayerSegmentPieChart;
