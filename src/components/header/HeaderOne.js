import React from "react";
import TopNavOne from "./top-nav/TopNavOne";
import MenuOne from "./menu/MenuOne";
import FunctionMenuOne from "./function-menu/FunctionMenuOne";

export default function HeaderOne({ activeHeaderCollapse, announcements }) {
  return (
    <>
      <TopNavOne announcements={announcements} />
      <MenuOne />
      <FunctionMenuOne activeHeaderCollapse={activeHeaderCollapse} />
    </>
  );
}
