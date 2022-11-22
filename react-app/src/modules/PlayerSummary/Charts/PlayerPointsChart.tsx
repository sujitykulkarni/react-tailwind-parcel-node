import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Label,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { ElementSummary } from "~/interfaces/elementSummary.interface";

const PlayerPointsChart = () => {
  const {
    playerSummary: {
      history,
      stats: { home_vs_away },
    },
  } = useOutletContext<{ playerSummary: ElementSummary }>();

  const homeVsAwayPoints = useMemo(
    () =>
      home_vs_away.filter((item) =>
        ["total_points", "goals_scored", "assists"].includes(item.stat_key)
      ),
    [home_vs_away]
  );

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-2">
      <div className="text-center">
        <h2>Total Points Per Game Week</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={400}
            data={history}
            margin={{
              top: 5,
              right: 5,
              bottom: 50,
              left: 5,
            }}
          >
            <Legend verticalAlign="top" margin={{ bottom: 10 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="round"
              label={{
                value: "Game Week",
                position: "bottom",
              }}
            />
            <YAxis
              label={{
                value: "Points",
                position: "insideLeft",
                angle: -90,
                offset: 15,
              }}
              domain={["auto", "auto"]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_points"
              stroke="#7f1d1d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {homeVsAwayPoints ? (
        <div className="text-center">
          <h2>Total Points at Home vs Away</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={homeVsAwayPoints}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stat_key" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="home" fill="#8884d8" />
              <Bar dataKey="away" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );
};

export default PlayerPointsChart;
