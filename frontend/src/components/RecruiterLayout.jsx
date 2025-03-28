import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const RecruiterLayout = () => {
  return (
    <div className="recruiter-layout" style={{ display: "flex" }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default RecruiterLayout;