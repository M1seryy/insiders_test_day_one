/** @format */
import { useSwipeable } from "react-swipeable";

import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./tabs.css";
import { ItemTypes } from "../../dndTypes/types";

export default function Tabs({ item, index, moveTab, onPin }) {
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const handlers = useSwipeable({
    onSwipedDown: () => setShowMenu(true),
    onSwipedUp: () => setShowMenu(false),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TAB,
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveTab(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [, drag] = useDrag({
    type: ItemTypes.TAB,
    item: { type: ItemTypes.TAB, id: item.id, index },
  });

  drag(drop(ref));

  const handlePin = () => {
    onPin(item.id);
    setShowMenu(false);
  };

  return (
    <div ref={ref} className={`${item.pinned ? "tab--pinned" : "tabItem"}`}>
      <span
        className="tabItem_text"
        onClick={() => (window.location.href = item.url)}
      >
        {item.label}
      </span>

      <div {...handlers} className="swipe-zone">
        ☰
      </div>

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
