import create from "zustand";
import { ElementSummary } from "../interfaces/elementSummary.interface";
import { fetchElements, fetchPlayerHistory } from "../api/api";
import { Element } from "../interfaces/element.interface";
import produce from "immer";

export type ElementSummaryStore = {
  [playerId: string]: ElementSummary;
};

type State = {
  players: Element[];
  summary: ElementSummaryStore;
};

type Action = {
  fetchPlayers: () => Promise<void>;
  storePlayers: (data: Element[]) => void;
  fetchSummary: (playerId: string) => Promise<void>;
};

export const usePlayersStore = create<State & Action>((set) => ({
  players: [],
  summary: {},
  fetchPlayers: async () => {
    const data = await fetchElements();
    set({ players: data });
  },
  storePlayers: (data: Element[]) =>
    set((state) => ({ ...state, players: data })),
  fetchSummary: async (playerId: string) => {
    const summary = await fetchPlayerHistory(playerId);
    set((state) =>
      produce(state, (draft) => {
        draft.summary[playerId] = summary;
        return draft;
      })
    );
  },
}));
