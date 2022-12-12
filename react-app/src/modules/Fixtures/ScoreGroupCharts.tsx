import React, { useCallback, useEffect, useMemo, useState } from "react";
import ScoreGroupPie from "./Charts/ScoreGroupPie";
import ScoreGroupBarChart from "./Charts/ScoreGroupBarChart";
import { useFixtureStore } from "../../store/fixture.store";
/**
 * Component that renders pie or bar chart based on team score groups
 * @returns
 */
export const ScoreGroupCharts = () => {
  const [chartType, setChartType] = useState<"pie" | "bar">("bar");
  const [fixtures, fetchFixtures] = useFixtureStore((state) => [
    state.fixtures,
    state.fetchFixtures,
  ]);

  const loadData = async () => {
    if (!fixtures.length) {
      await fetchFixtures();
    }
  };

  const init = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(init, []);

  const scoreHistogramData = useMemo(() => {
    const scores = fixtures
      .sort(
        (a, b) =>
          a.team_h_score - b.team_h_score || a.team_a_score - b.team_a_score
      )
      .map((fixture) =>
        fixture.finished
          ? `${fixture.team_h_score}-${fixture.team_a_score}`
          : null
      );
    const scoreGroups = scores.reduce(
      (acc: { [key: string]: number }, cur: string | null) => {
        if (cur) {
          if (!acc[cur]) {
            acc[cur] = 1;
            return acc;
          }
          acc[cur] += 1;
          return acc;
        }
        return acc;
      },
      {}
    );
    return Object.keys(scoreGroups).map((key) => ({
      name: key,
      value: scoreGroups[key],
    }));
  }, [fixtures]);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">
          Scores from completed fixtures grouped by their count
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setChartType("pie")}>Pie</button>
          <button onClick={() => setChartType("bar")}>Bar</button>
        </div>
      </div>
      {chartType === "pie" ? (
        <ScoreGroupPie data={scoreHistogramData} />
      ) : (
        <ScoreGroupBarChart data={scoreHistogramData} />
      )}
    </div>
  );
};
