import React, { useState } from "react";
import Link from "next/link";
import navigatorData from "../../../data/navigator.json";

function Navigator() {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const renderMenuItem = (itemData) => (
    <li
      key={itemData.title}
      className={`navigation-item ${itemData.subMenu ? "-toggleable" : ""}`}
    >
      <Link href={itemData.href} className="navigation-item__title">
        {itemData.title}
      </Link>
      {itemData.subMenu && (
        <ul className="navigation-item__submenu">
          {itemData.subMenu.map((subItem, subIndex) => (
            <li key={subIndex}>
              <Link href={subItem.href}>{subItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <ul className="navigation" onClick={handleClick}>
      {Object.entries(navigatorData).map(([key, itemData]) =>
        renderMenuItem(itemData)
      )}
    </ul>
  );
}

export default React.memo(Navigator);
