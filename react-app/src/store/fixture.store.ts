import create from "zustand";
import { fetchGameWeeks as fetchGameWeeksApi } from "../api/api";
import { Event } from "../interfaces/events.interface";

type State = {
  gameWeeks: Event[];
};

type Action = {
  fetchGameWeeks: () => Promise<void>;
};

export const useFixtureStore = create<State & Action>((set) => ({
  gameWeeks: [],
  fetchGameWeeks: async () => {
    const gameweeks = await fetchGameWeeksApi();
    set({ gameWeeks: gameweeks });
  },
}));
