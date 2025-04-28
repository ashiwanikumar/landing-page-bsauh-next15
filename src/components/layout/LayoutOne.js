import React, { useState, useEffect, useRef } from "react";
import { BackTop } from "antd";

import HeaderOne from "../header/HeaderOne";
import Footer from "../footer/Footer";
import CookieSquare from "../footer/CookieSquare";
import withHeaderScroll from "../../common/withHeaderScroll";
import { getAllAnnouncementsApproved } from "../../apis/announcement";

function LayoutOne({ title, children, headerClass, footerClass }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const ScrolledHeader = withHeaderScroll(HeaderOne);
  const layoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Moved the cookie banner logic into its own function
    checkCookieBannerVisibility();

    fetchAnnouncements();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkCookieBannerVisibility = () => {
    const cookieData = JSON.parse(localStorage.getItem("cookieAccepted"));
    const currentTime = new Date().getTime();

    if (!cookieData || currentTime - cookieData.timestamp > 900000 * 4 * 12) {
      // 900000 milliseconds = 15 minutes
      setShowCookieBanner(true);
    } else {
      setShowCookieBanner(false);
    }
  };

  const hideCookieBanner = () => {
    setShowCookieBanner(false);
  };

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await getAllAnnouncementsApproved();
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <>
      <ScrolledHeader className={headerClass} announcements={announcements} />

      {children}

      {/* Conditional rendering of CookieBanner */}
      {showCookieBanner && <CookieSquare onHide={hideCookieBanner} />}

      <Footer className={footerClass} />

      <BackTop />
    </>
  );
}

export default React.memo(LayoutOne);
