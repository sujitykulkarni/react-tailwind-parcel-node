import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Navigation/Sidebar";
export const Root = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <Sidebar direction="row" />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
