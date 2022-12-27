import React, { lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./index.css";
import { Root } from "./modules/Root";
import Home from "./modules/Home/Home";

const PlayersViewOutlet = lazy(
  () => import("./modules/PlayersDashboard/PlayersViewOutlet")
);
const PlayersOverview = lazy(
  () => import("./modules/PlayersDashboard/PlayersOverview")
);
const PlayerPointsChart = lazy(
  () => import("./modules/PlayerSummary/Charts/PlayerPointsChart")
);
const PlayerPointsVsOppnChart = lazy(
  () => import("./modules/PlayerSummary/Charts/PlayerPointsVsOppnChart")
);
const PlayerTransfersVsOppnChart = lazy(
  () => import("./modules/PlayerSummary/Charts/PlayerTransfersVsOppnChart")
);
const PlayerTransfersChart = lazy(
  () => import("./modules/PlayerSummary/Charts/PlayerTransfersChart")
);
const PlayerValueChart = lazy(
  () => import("./modules/PlayerSummary/Charts/PlayerValueChart")
);
const PlayerFixtures = lazy(
  () => import("./modules/PlayerSummary/PlayerFixtures")
);
const PlayerHistory = lazy(
  () => import("./modules/PlayerSummary/PlayerHistory")
);
const PlayerPastSeasons = lazy(
  () => import("./modules/PlayerSummary/PlayerPastSeasons")
);
const PlayerSummary = lazy(
  () => import("./modules/PlayerSummary/PlayerSummary")
);
const PlayerVisualizations = lazy(
  () => import("./modules/PlayerSummary/PlayerVisualizations")
);
const Fixtures = lazy(() => import("./modules/Fixtures/Fixtures"));
const FixtureEvents = lazy(
  () => import("./modules/Fixtures/Charts/FixtureEvents")
);
const ScoreGroupCharts = lazy(
  () => import("./modules/Fixtures/ScoreGroupCharts")
);

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
        element: <PlayersViewOutlet />,
        children: [
          {
            index: true,
            element: <PlayersOverview />,
          },
          {
            path: "overview",
            element: <PlayersOverview />,
          },
          {
            path: "segments",
            element: "Segments",
          },
        ],
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
