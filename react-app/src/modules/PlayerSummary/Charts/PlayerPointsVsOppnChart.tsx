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
} from "recharts";
import {
  ElementSummary,
  ElementStatsByOpponentStrength,
} from "~/interfaces/elementSummary.interface";

const PlayerPointsVsOppnChart = () => {
  const {
    playerSummary: {
      stats: { opponent_strength_stats },
    },
  } = useOutletContext<{ playerSummary: ElementSummary }>();

  const pointsByStrengthData = useMemo(() => {
    if (opponent_strength_stats.length) {
      const data = reduce(
        opponent_strength_stats,
        (
          res: Omit<ElementStatsByOpponentStrength, "opponent_team">[],
          { opponent_strength, total_points, minutes }
        ) => {
          const matchIndex = res.findIndex(
            (item) => item.opponent_strength === opponent_strength
          );
          if (res[matchIndex]) {
            res[matchIndex].total_points =
              res[matchIndex].total_points + total_points;
          } else
            res.push({
              opponent_strength,
              total_points,
              minutes,
            });
          return res;
        },
        []
      );
      return sortBy(data, "opponent_strength");
    }
    return [];
  }, [opponent_strength_stats]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RadarChart outerRadius={200} data={pointsByStrengthData}>
        <PolarGrid gridType="circle" />
        <PolarAngleAxis dataKey="opponent_strength" />
        <PolarRadiusAxis angle={30} radius={60} />
        <Radar
          name="Points vs Opponent Strength"
          dataKey="total_points"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PlayerPointsVsOppnChart;
