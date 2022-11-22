import React from "react";
import { KeySelectorOption } from "./keySelector.interface";

const criteria: KeySelectorOption[] = [
  {
    key: "",
    label: "No criteria",
  },
  {
    key: "chance_of_playing_next_round",
    label: "Chance of playing next round",
  },
  {
    key: "chance_of_playing_this_round",
    label: "Chance of playing this round",
  },
  {
    key: "goals_scored",
    label: "Goals Scored",
  },
  {
    key: "assists",
    label: "Assists",
  },
  {
    key: "own_goals",
    label: "Own Goals",
  },
  {
    key: "penalties_missed",
    label: "Penalties Missed",
  },
  {
    key: "penalties_saved",
    label: "Penalties Saved",
  },
  {
    key: "saves",
    label: "Saves",
  },
  {
    key: "bonus",
    label: "Bonus",
  },
];
const ElementCriteriaSelector = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <React.Fragment>
      <span>Number of Players with </span>
      <select onChange={onChange}>
        {criteria.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default React.memo(ElementCriteriaSelector);
