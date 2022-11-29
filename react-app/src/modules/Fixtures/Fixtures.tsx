import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFixtureStore } from "../../store/fixture.store";
import EventFlowChart from "../../components/EventFlowChart/EventFlowChart";
import ScoreGroupPie from "./Charts/ScoreGroupPie";
import ScoreGroupBarChart from "./Charts/ScoreGroupBarChart";

const Fixtures = () => {
  const [chartType, setChartType] = useState<"pie" | "bar">("bar");
  const [gameWeeks, fixtures, fetchGameWeeks, fetchFixtures] = useFixtureStore(
    (state) => [
      state.gameWeeks,
      state.fixtures,
      state.fetchGameWeeks,
      state.fetchFixtures,
    ]
  );

  const gameWeekEventFlowData = useMemo(
    () =>
      gameWeeks.map((gw) => ({
        event: gw.name,
        time: new Date(gw.deadline_time),
        label: gw.id.toString(),
        size: gw.transfers_made,
      })),
    [gameWeeks]
  );

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

  const loadData = useCallback(async () => {
    await fetchGameWeeks();
    await fetchFixtures();
  }, [fetchGameWeeks, fetchFixtures]);

  const init = useCallback(() => {
    if (!gameWeeks.length) {
      loadData();
    }
  }, [loadData, gameWeeks.length]);

  useEffect(init, []);

  return gameWeekEventFlowData.length ? (
    <div className="min-h-screen p-2 flex flex-col justify-start gap-4">
      <div>
        <h1 className="text-2xl">
          Fixtures sized by transfers made per game week
        </h1>
        <EventFlowChart data={gameWeekEventFlowData} />
      </div>
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
        {chartType === "pie" && <ScoreGroupPie data={scoreHistogramData} />}
        {chartType === "bar" && (
          <ScoreGroupBarChart data={scoreHistogramData} />
        )}
      </div>
    </div>
  ) : null;
};

export default Fixtures;
