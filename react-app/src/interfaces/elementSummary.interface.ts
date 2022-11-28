import { Fixture } from "./fixtures.interface";

export type ElementHomeVsAwayStat = {
  stat_key: string;
  home: number;
  away: number;
};

export type ElementStatsByOpponentStrength = Pick<
  History,
  | "opponent_team"
  | "total_points"
  | "minutes"
  | "transfers_in"
  | "transfers_out"
> & {
  opponent_strength: number;
};

export interface ElementSummary {
  fixtures: AdvancedFixtureInfo[];
  history: History[];
  history_past: HistoryPast[];
  stats: {
    home_vs_away: ElementHomeVsAwayStat[];
    opponent_strength_stats: ElementStatsByOpponentStrength[];
  };
}

export interface HistoryPast {
  season_name: string;
  element_code: number;
  start_cost: number;
  end_cost: number;
  total_points: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
}

export interface History {
  element: number;
  fixture: number;
  opponent_team: number;
  total_points: number;
  was_home: boolean;
  kickoff_time: string;
  team_h_score: number;
  team_a_score: number;
  round: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  value: number;
  transfers_balance: number;
  selected: number;
  transfers_in: number;
  transfers_out: number;
}

export interface AdvancedFixtureInfo extends Fixture {
  event_name?: string;
  is_home: boolean;
  difficulty: number;
}

export interface FixtureWithTeamShortNames extends AdvancedFixtureInfo {
  home_team_short_name?: string;
  away_team_short_name?: string;
}
