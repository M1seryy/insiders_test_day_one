/** @format */

//   TAB MODEL
// {
//     id: 1,
//     label: 'Tab 1',
//     url: '/tab-1',
//     pinned: false
//   }

import React, { useState } from "react";
import "./tabs.css";

export default function Tabs({ item, onPin }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handlePin = () => {
    onPin(item.id); // або що в тебе там
    setShowMenu(false);
  };
  return (
    <div
      className={`${item.pinned ? "tab--pinned" : "tabItem"}`}
      onClick={() => toggleMenu()}
    >
      <span
        onClick={() => (window.location.href = item.url)}
        className="tabItem_text"
      >
        {item.label}
      </span>
      {showMenu && (
        <div className="tab-menu">
          <button className="pinButton" onClick={handlePin}>
            {item.pinned ? "Відкріпити" : "Закріпити"}
          </button>
        </div>
      )}
    </div>
  );
}
