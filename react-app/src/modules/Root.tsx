import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navigation/Navbar";
import { globalNavLinks } from "../constants";
export const Root = () => {
  return (
    <div className="flex flex-col p-2 gap-2">
      <Navbar links={globalNavLinks} />
      <div className="">
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
