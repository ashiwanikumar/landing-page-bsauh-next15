import React, { useEffect } from "react";
import Link from "next/link";

import Container from "../../other/Container";
import Navigator from "../elements/Navigator";
import MobileMenuOpener from "../elements/MobileMenuOpener";

export default function MenuOne() {
  // Make menu header sticky always on top even when scrolling
  useEffect(() =>
    window.addEventListener("scroll", () => {
      const menuHeader = document.getElementById("menuHeader");
      if (menuHeader) {
        if (window.pageYOffset > 0) {
          menuHeader.style.position = "fixed";
          menuHeader.style.backgroundColor = "white";
          menuHeader.style.justifyContent = "center";
          menuHeader.style.width = "100%";
        } else {
          menuHeader.style.position = "sticky";
        }
      }
    })
  );

  return (
    <div
      className="menu -style-one"
      id="menuHeader"
      style={{ position: "sticky", top: 0, zIndex: 100, padding: 0 }}
    >
      <Container>
        <div className="menu-wrapper">
          <MobileMenuOpener />

          {/* Logo */}
          <Link href="/" className="menu-logo">
            <img src="/assets/images/logo.png" alt="BSAD logo" width="100" />
          </Link>

          {/* Main Menu */}
          <Navigator />
        </div>
      </Container>
    </div>
  );
}
