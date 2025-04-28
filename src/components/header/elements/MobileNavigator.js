import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  CalendarOutlined,
  BookOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import navigatorData from "../../../data/navigator.json";
import MobileSocialIcons from "../../other/MobileSocialIcons";

function MobileNavigator() {
  const { SubMenu } = Menu;
  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const getIcon = (title) => {
    switch (title) {
      case "Home":
        return <HomeOutlined />;
      case "About Us":
        return <InfoCircleOutlined />;
      case "Blog":
        return <ReadOutlined />;
      case "Events":
        return <CalendarOutlined />;
      case "Resources":
        return <BookOutlined />;
      case "More":
        return <MoreOutlined />;
      default:
        return null;
    }
  };

  const renderMenuItem = (itemData) => (
    <Menu.Item key={itemData.title} icon={getIcon(itemData.title)}>
      <Link href={itemData.href}>{itemData.title}</Link>
    </Menu.Item>
  );

  const renderSubMenu = (itemData) => (
    <SubMenu
      key={itemData.title}
      title={itemData.title}
      icon={getIcon(itemData.title)}
    >
      {itemData.subMenu.map((subItem, subIndex) => (
        <Menu.Item key={subItem.title}>
          <Link href={subItem.href}>{subItem.title}</Link>
        </Menu.Item>
      ))}
    </SubMenu>
  );

  return (
    <div className="menu-mobile">
      <Menu
        className="menu-mobile-navigator"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        {Object.entries(navigatorData).map(([key, itemData]) =>
          itemData.subMenu ? renderSubMenu(itemData) : renderMenuItem(itemData)
        )}
      </Menu>

      <div className="menu-mobile-functions">
        <a className="menu-mobile-functions__login">Follow Us</a>
        <MobileSocialIcons />
      </div>
    </div>
  );
}

export default React.memo(MobileNavigator);
