import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navigation/Navbar";

/**
 * Fixtures route outlet
 * @returns
 */
const Fixtures = () => {
  return (
    <div className="min-h-screen p-2 flex flex-col justify-start gap-4">
      <Navbar
        links={[
          { path: "events", label: "Events" },
          { path: "scores", label: "Scores" },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default Fixtures;
