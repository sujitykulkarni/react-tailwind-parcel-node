import { Element } from "../interfaces/element.interface";

export const { API_HOST } = process.env;

export enum ELEMENT_TYPE {
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
}

export const globalNavLinks = [
  { path: "/", label: "Home", icon: "🏠", end: true },
  { path: "/players", label: "Players", icon: "👕" },
  { path: "/fixtures", label: "Fixtures", icon: "⌚" },
  { path: "/notes", label: "Set Piece Notes", icon: "📝" },
];

export const ELEMENT_STATS: Array<{ label: string; name: keyof Element }> = [
  {
    label: "Minutes played",
    name: "minutes",
  },
  {
    label: "Goals scored",
    name: "goals_scored",
  },
  {
    label: "Assists",
    name: "assists",
  },
  {
    label: "Clean sheets",
    name: "clean_sheets",
  },
  {
    label: "Goals conceded",
    name: "goals_conceded",
  },
  {
    label: "Own goals",
    name: "own_goals",
  },
  {
    label: "Penalties saved",
    name: "penalties_saved",
  },
  {
    label: "Penalties missed",
    name: "penalties_missed",
  },
  {
    label: "Yellow cards",
    name: "yellow_cards",
  },
  {
    label: "Red cards",
    name: "red_cards",
  },
  {
    label: "Saves",
    name: "saves",
  },
  {
    label: "Bonus",
    name: "bonus",
  },
  {
    label: "Bonus Points System",
    name: "bps",
  },
  {
    label: "Influence",
    name: "influence",
  },
  {
    label: "Creativity",
    name: "creativity",
  },
  {
    label: "Threat",
    name: "threat",
  },
  {
    label: "ICT Index",
    name: "ict_index",
  },
  {
    label: "Game(s) Started",
    name: "starts",
  },
  {
    label: "Expected Goals",
    name: "expected_goals",
  },
  {
    label: "Expected Assists",
    name: "expected_assists",
  },
  {
    label: "Expected Goal Involvements",
    name: "expected_goal_involvements",
  },
  {
    label: "Expected Goals Conceded",
    name: "expected_goals_conceded",
  },
];

export const CHART_COLORS = [
  "#c4b5fd",
  "#fb7185",
  "#14b8a6",
  "#ef4444",
  "#ea580c",
  "#b45309",
];
