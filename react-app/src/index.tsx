import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./index.css";
import Dashboard from "./modules/Dashboard/Dashboard";
import PlayerPointsChart from "./modules/PlayerSummary/Charts/PlayerPointsChart";
import PlayerPointsVsOppnChart from "./modules/PlayerSummary/Charts/PlayerPointsVsOppnChart";
import PlayerTransfersVsOppnChart from "./modules/PlayerSummary/Charts/PlayerTransfersVsOppnChart";
import PlayerTransfersChart from "./modules/PlayerSummary/Charts/PlayerTransfersChart";
import PlayerValueChart from "./modules/PlayerSummary/Charts/PlayerValueChart";
import { PlayerFixtures } from "./modules/PlayerSummary/PlayerFixtures";
import { PlayerHistory } from "./modules/PlayerSummary/PlayerHistory";
import PlayerPastSeasons from "./modules/PlayerSummary/PlayerPastSeasons";
import PlayerSummary from "./modules/PlayerSummary/PlayerSummary";
import PlayerVisualizations from "./modules/PlayerSummary/PlayerVisualizations";
import { Root } from "./modules/Root";
import Fixtures from "./modules/Fixtures/Fixtures";
import { FixtureEvents } from "./modules/Fixtures/Charts/FixtureEvents";
import { ScoreGroupCharts } from "./modules/Fixtures/ScoreGroupCharts";
import Home from "./modules/Home/Home";

// Router config
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/players",
        element: <Dashboard />,
      },
      {
        path: "/fixtures",
        element: <Fixtures />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <FixtureEvents />,
          },
          {
            path: "events",
            element: <FixtureEvents />,
          },
          {
            path: "scores",
            element: <ScoreGroupCharts />,
          },
        ],
      },
      {
        path: "/player/:id",
        element: <PlayerSummary />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <PlayerHistory />,
          },
          {
            path: "homeaway",
            element: <PlayerHistory />,
          },
          {
            path: "fixtures",
            element: <PlayerFixtures />,
          },
          {
            path: "past",
            element: <PlayerPastSeasons />,
          },
          {
            path: "visualizations",
            element: <PlayerVisualizations />,
            children: [
              {
                index: true,
                element: <PlayerPointsChart />,
              },
              {
                path: "pointspergw",
                element: <PlayerPointsChart />,
              },
              {
                path: "pointsvsopponent",
                element: <PlayerPointsVsOppnChart />,
              },
              {
                path: "transfersvsopponent",
                element: <PlayerTransfersVsOppnChart />,
              },
              {
                path: "value",
                element: <PlayerValueChart />,
              },
              {
                path: "transfers",
                element: <PlayerTransfersChart />,
              },
            ],
          },
        ],
      },
      {
        path: "notes",
        element: "Notes",
      },
    ],
  },
]);

/**
 * Root component
 * @returns
 */
const App: React.FunctionComponent<{}> = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
