/** @format */

import React, { useRef, useState, useEffect } from "react";
import Tabs from "../Tabs/Tabs";
import "./tabContainer.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TabContainer() {
  const containerRef = useRef();
  const tabRefs = useRef([]);
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [overflowTabs, setOverflowTabs] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const [tabs, setTabs] = useState(() => {
    const saved = localStorage.getItem("tabs");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, label: "DashBoard", url: "/dashboard", pinned: true },
          { id: 2, label: "Banking", url: "/banking", pinned: false },
          { id: 3, label: "Telefonie", url: "/telefonie", pinned: false },
          { id: 4, label: "Accounting", url: "/accounting", pinned: true },
          { id: 5, label: "Verkauf", url: "/verkauf", pinned: false },
          { id: 6, label: "Statistik", url: "/statistik", pinned: true },
          { id: 7, label: "Post Office", url: "/post-office", pinned: true },
          {
            id: 8,
            label: "Administration",
            url: "/administration",
            pinned: true,
          },
          { id: 9, label: "Help", url: "/help", pinned: false },
          {
            id: 10,
            label: "Warenbestand",
            url: "/warenbestand",
            pinned: false,
          },
          {
            id: 11,
            label: "Auswahllisten",
            url: "/auswahllisten",
            pinned: false,
          },
          { id: 12, label: "Einkauf", url: "/einkauf", pinned: true },
          { id: 13, label: "Rechn", url: "/rechn", pinned: false },
        ];
  });

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const onTabHandler = (id) => {
    const result = tabs.filter((item) => {
      return item.id != id;
    });
    setTabs(result);
  };
  const handleTogglePin = (id) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, pinned: !tab.pinned } : tab))
    );
  };

  const calculateTabs = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    let usedWidth = 0;
    const visible = [];
    const overflow = [];

    tabRefs.current = tabRefs.current.slice(0, tabs.length);

    tabs.forEach((tab, index) => {
      const width = tabRefs.current[index]?.offsetWidth || 145;
      if (tab.pinned || usedWidth + width < containerWidth - 60) {
        visible.push(tab);
        usedWidth += width;
      } else {
        overflow.push(tab);
      }
    });

    setVisibleTabs(visible);
    setOverflowTabs(overflow);
  };

  useEffect(() => {
    calculateTabs();
    window.addEventListener("resize", calculateTabs);
    return () => window.removeEventListener("resize", calculateTabs);
  }, [tabs]);

  const moveTab = (fromIndex, toIndex) => {
    const visibleIds = visibleTabs.map((t) => t.id);
    const visibleOnly = tabs.filter((t) => visibleIds.includes(t.id));

    // рухаємо елемент
    const dragged = visibleOnly[fromIndex];
    visibleOnly.splice(fromIndex, 1);
    visibleOnly.splice(toIndex, 0, dragged);

    const updatedTabs = tabs.map((tab) => {
      const matchIndex = visibleIds.indexOf(tab.id);
      if (matchIndex !== -1) {
        return visibleOnly[matchIndex];
      }
      return tab;
    });

    setTabs(updatedTabs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container" ref={containerRef}>
        <div className="tabs-wrapper">
          {visibleTabs.map((item, index) => (
            <div key={item.id} ref={(el) => (tabRefs.current[index] = el)}>
              <Tabs
                onFilter={onTabHandler}
                item={item}
                index={index}
                moveTab={moveTab}
                onPin={handleTogglePin}
              />
            </div>
          ))}
        </div>

        {overflowTabs.length > 0 && (
          <div className="overflow-wrapper">
            <button
              className="overflow-button"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              ⋯
            </button>
            {showMenu && (
              <div className="overflow-menu">
                {overflowTabs.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item"
                    onClick={() => (window.location.href = item.url)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DndProvider>
  );
}
