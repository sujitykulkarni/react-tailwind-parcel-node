import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePlayersWithTeamName from "../../hooks/usePlayersWithTeamName";
import { Element } from "../../interfaces/element.interface";
import Card from "../../components/Card/Card";
import { ELEMENT_STATS } from "../../constants";
import { reverse, sortBy, take } from "lodash";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";
import { Avatar } from "../../components/Avatar/Avatar";
import PlayerSegmentPieChart from "./PlayerSegmentPieChart";
import Stat from "../../components/Stat/Stat";

const PlayersSegments = () => {
  const navigate = useNavigate();
  const playersWithTeamName = usePlayersWithTeamName();
  const {
    category = "top",
    count = "5",
    criteria = "goals_scored",
  } = useParams<{
    category: "top" | "bottom";
    count: string;
    criteria: keyof Required<Element>;
  }>();
  const categoryName = useMemo(
    () => ELEMENT_STATS.find((stat) => stat.name === criteria)?.label,
    [criteria]
  );
  const data = useMemo(() => {
    const sorted = sortBy(
      playersWithTeamName.map((player) => ({
        ...player,
        [criteria]:
          typeof player[criteria] === "string"
            ? parseFloat(player[criteria])
            : player[criteria],
      })),
      criteria as string
    ); // sorts ascending
    switch (category) {
      case "top":
        return take(reverse(sorted), parseInt(count));
      case "bottom":
        return take(sorted, parseInt(count));
      default:
        return [];
    }
  }, [playersWithTeamName, criteria, count, category]);

  if (!category || !criteria) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="w-1/3">
          <Select
            options={[
              { key: "top", value: "top", text: "Top" },
              { key: "bottom", value: "bottom", text: "Bottom" },
            ]}
            onSelect={(value) =>
              navigate(`../segment/${value}/${count}/${criteria}`)
            }
            selected={category}
            label="Category"
          />
        </div>
        <div className="w-1/3">
          <Input
            type="number"
            onBlur={(event) =>
              navigate(
                `../segment/${category}/${event.target.value}/${criteria}`
              )
            }
            defaultValue={count}
            max={playersWithTeamName.length}
            className="w-full border"
            label="Count"
          />
        </div>
        <div className="w-1/3">
          <Select
            options={ELEMENT_STATS.map((ele) => ({
              key: ele.name,
              value: ele.name,
              text: ele.label,
            }))}
            onSelect={(value) =>
              navigate(`../segment/${category}/${count}/${value}`)
            }
            selected={criteria}
            label="Criteria"
          />
        </div>
      </div>
      <div className="flex flex-row justify-start gap-4">
        <div className="w-1/2">
          <Card
            title={`${category.toUpperCase()} ${count} ${categoryName}`}
            bodyClasses="min-h-80 max-h-96 overflow-y-auto"
          >
            <ul>
              {data.map((player) => (
                <li className="w-full py-4 border-b border-slate-100 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16">
                      <Avatar path={player.photo} />
                    </div>
                    <div className="flex flex-col justify-start">
                      <div className="text-xl w-full text-primary">
                        {player.web_name}
                      </div>
                      <div className="w-full text-sm">
                        {player.team_short_name}
                      </div>
                    </div>
                  </div>
                  <Stat value={player[criteria]} />
                  {/* <div className="text-xl">{player[criteria]}</div> */}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="w-1/2">
          <Card
            title={`${categoryName} (team average by ${category} ${count})`}
          >
            <PlayerSegmentPieChart data={data} criteria={criteria} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayersSegments;
