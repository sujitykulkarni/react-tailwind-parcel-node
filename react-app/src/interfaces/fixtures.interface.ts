import { Team } from "./teams.interfaces";

export interface Fixture {
  code: number;
  event: number;
  finished: boolean;
  finished_provisional: boolean;
  id: number;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: boolean;
  started: boolean;
  team_a: number;
  team_a_score: number;
  team_h: number;
  team_h_score: number;
  stats: Stat[];
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
}

export interface Stat {
  identifier: string;
  a: StatInfo[];
  h: StatInfo[];
}

export interface StatInfo {
  value: number;
  element: number;
}

export interface FixtureDifficultyCorrelation
  extends Pick<Team, "code" | "short_name">,
    Pick<
      Fixture,
      | "id"
      | "event"
      | "team_h_difficulty"
      | "team_a_difficulty"
      | "team_a_score"
      | "team_h_score"
    > {}
