/** @format */

import React, { use } from "react";
import "./dashBoard.css";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="dashBoard">
      <div className="dashBoard_content">
        {capitalize(window.location.pathname.substring(1))}
      </div>
    </div>
  );
}
