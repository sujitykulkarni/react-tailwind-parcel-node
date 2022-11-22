import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFixtureStore } from "../../store/fixture.store";
import FixtureEventFlow from "../../components/EventFlowChart/FixtureEventFlow";
import { Event } from "../../interfaces/events.interface";

const Fixtures = () => {
  const [gameWeeks, fetchGameWeeks] = useFixtureStore((state) => [
    state.gameWeeks,
    state.fetchGameWeeks,
  ]);

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
  const loadData = useCallback(async () => {
    await fetchGameWeeks();
  }, [fetchGameWeeks]);

  const init = useCallback(() => {
    if (!gameWeeks.length) {
      loadData();
    }
  }, [loadData, gameWeeks.length]);

  useEffect(init, []);

  return gameWeekEventFlowData.length ? (
    <div className="min-h-screen p-2">
      <h1 className="text-2xl">
        Fixtures sized by transfers made per game week.
      </h1>
      <FixtureEventFlow data={gameWeekEventFlowData} />
    </div>
  ) : null;
};

export default Fixtures;
