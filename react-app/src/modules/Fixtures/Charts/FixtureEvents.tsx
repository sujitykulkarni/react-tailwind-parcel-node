import React, { useCallback, useEffect, useMemo } from "react";
import { useFixtureStore } from "../../../store/fixture.store";
import EventFlowChart from "../../../components/EventFlowChart/EventFlowChart";
import Card from "../../../components/Card/Card";

/**
 * Fixture events visualizations of following categories
 * -  Fixtures sized by transfers made per game week
 * -  Total goals scored at the end of a game week
 * @returns {JSX.Element | null}
 */
const FixtureEvents = (): JSX.Element | null => {
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
      gameWeeks
        .filter((gw) => gw.finished)
        .map((gw) => ({
          event: gw.name,
          time: new Date(gw.deadline_time),
          label: gw.transfers_made.toString(),
          size: gw.transfers_made,
        })),
    [gameWeeks]
  );
  const goalsEventFlowData = useMemo(
    () =>
      fixtures
        .filter((fixture) => fixture.finished)
        .reduce(
          (
            acc: Array<
              Record<"event" | "label", string> & { size: number; time: Date }
            >,
            cur
          ) => {
            let index = acc.findIndex(
              (f) => f.event.toString() === cur.event.toString()
            );
            let size = cur.team_h_score + cur.team_a_score;
            if (index === -1) {
              acc.push({
                event: cur.event.toString(),
                time: new Date(cur.kickoff_time),
                label: `${size}`,
                size,
              });
              return acc;
            }
            size = acc[index].size + size;
            const next = {
              ...acc[index],
              time: new Date(cur.kickoff_time),
              label: `${size}`,
              size,
            };
            acc.splice(index, 1, next);
            return acc;
          },
          []
        ),
    [fixtures]
  );
  const loadData = async () => {
    await fetchGameWeeks();
    await fetchFixtures();
  };

  const init = useCallback(() => {
    if (!gameWeeks.length) {
      loadData();
    }
  }, [loadData, gameWeeks.length]);

  useEffect(init, []);

  if (!gameWeekEventFlowData) return null;

  return (
    <div className="flex flex-col gap-4">
      <Card title="Fixtures sized by transfers made per game week">
        <EventFlowChart data={gameWeekEventFlowData} id="a" />
      </Card>
      <Card title="Total goals scored at the end of a game week">
        <EventFlowChart data={goalsEventFlowData} id="b" />
      </Card>
    </div>
  );
};

export default FixtureEvents;
