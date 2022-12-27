import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navigation/Navbar";

const PlayersViewOutlet = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <Navbar
        links={[
          { path: "overview", label: "Overview", end: true },
          { path: "segments", label: "Segments", end: true },
        ]}
        secondary
      />
      <div className="max-w-full">
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default PlayersViewOutlet;
