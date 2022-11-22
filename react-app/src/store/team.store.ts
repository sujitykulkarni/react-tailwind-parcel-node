import create from "zustand";
import { fetchTeams } from "../api/api";
import { Team } from "../interfaces/teams.interfaces";

type State = {
  teams: Team[];
};

type Action = {
  storeTeams: (data: Team[]) => void;
  fetchTeams: () => Promise<void>;
};

export const useTeamStore = create<State & Action>((set) => ({
  teams: [],
  fetchTeams: async () => {
    const data = await fetchTeams();
    set({ teams: data });
  },
  storeTeams: (data: Team[]) => set((state) => ({ ...state, teams: data })),
}));
