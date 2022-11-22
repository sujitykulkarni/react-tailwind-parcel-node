import { Event } from "./events.interface";
import { GameSettings } from "./gameSettings.interface";
import { Phase } from "./phase.interface";
import { Team } from "./teams.interfaces";
import { Element, ElementStat, ElementType } from "./element.interface";

export interface BootstrapData {
  total_players: number;
  events: Event[];
  game_settings: GameSettings;
  phases: Phase[];
  teams: Team[];
  elements: Element[];
  element_stats: ElementStat[];
  element_types: ElementType[];
}
