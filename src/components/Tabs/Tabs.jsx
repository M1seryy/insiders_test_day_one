/** @format */

//   TAB MODEL
// {
//     id: 1,
//     label: 'Tab 1',
//     url: '/tab-1',
//     pinned: false
//   }

import React from "react";
import "./tabs.css";

export default function Tabs({ item }) {
  return (
    <div className={`${item.pinned ? "tab--pinned" : "tabItem"}`}>
      <span className="tabItem_text">{item.label}</span>
    </div>
  );
}
