import create from "zustand";
import { Fixture } from "~/interfaces/fixtures.interface";
import { fetchFixtures, fetchGameWeeks as fetchGameWeeksApi } from "../api/api";
import { Event } from "../interfaces/events.interface";

type State = {
  gameWeeks: Event[];
  fixtures: Fixture[];
};

type Action = {
  fetchGameWeeks: () => Promise<void>;
  fetchFixtures: () => Promise<void>;
};

export const useFixtureStore = create<State & Action>((set) => ({
  gameWeeks: [],
  fixtures: [],
  fetchGameWeeks: async () => {
    const gameweeks = await fetchGameWeeksApi();
    set({ gameWeeks: gameweeks });
  },
  fetchFixtures: async () => {
    const fixtures = await fetchFixtures();
    set({ fixtures });
  },
}));
