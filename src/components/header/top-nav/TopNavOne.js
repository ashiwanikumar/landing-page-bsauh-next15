import React, { useEffect, useState } from "react";
import Container from "../../other/Container";
import SocialIcons from "../../other/SocialIcons";
import { Select, Button } from "antd";
import moment from "moment-timezone";

const flagData = [
  { name: "english", image: "/assets/images/header/flag-usa.png" },
  { name: "हिंदी", image: "/assets/images/header/flag-ind.png" },
  { name: "UAE", image: "/assets/images/header/flag-uae.png" },
];

export default function TopNavOne({ containerFluid, announcements }) {
  const { Option } = Select;

  const [uaeTime, setUaeTime] = useState("");
  const [indiaTime, setIndiaTime] = useState("");

  // Function to update time for both countries
  const updateTime = () => {
    // Updated format to only show time
    setUaeTime(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
    setIndiaTime(moment().tz("Asia/Kolkata").format("hh:mm:ss A"));
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval);
  }, []);

  const stickyAnnouncement = announcements.find(
    (announcement) => announcement.announcementType === "sticky"
  );

  return (
    <>
      {stickyAnnouncement && (
        <div className="announcement-bar">
          <Container>
            <div className="announcement-content">
              <p className="announcement-link">{stickyAnnouncement.message}</p>
            </div>
          </Container>
        </div>
      )}

      {/* UAE Time Display */}
      {/* <div style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
        <img
          src="/assets/images/header/flag-uae.png"
          alt="UAE Flag"
          style={{ width: "20px", marginRight: "5px" }}
        />
        {uaeTime}
      </div> */}

      <div className="top-nav-one">
        <Container fluid={containerFluid}>
          <div className="top-nav-one-wrapper">
            <div className="top-nav-one-left">
              <ul>
                <li>
                  <i className="fas fa-envelope" />
                  info@biharsamajabudhabi.com
                </li>
                {/* <li>
                  <i className="fas fa-phone-alt" />
                  +971-5695XXXXX
                </li> */}
              </ul>
            </div>

            <div className="top-nav-one-right">
              <div className="top-nav-one-right__item">
                <SocialIcons />
              </div>

              {/* Language Display */}

              <div
                className="top-nav-one-right__item"
                style={{ color: "white" }}
              >
                <i
                  className="fas fa-globe-americas"
                  style={{ marginRight: "8px" }}
                ></i>
                English
              </div>

              <div className="top-nav-one-right__item">
                <a
                  href="https://portal.biharsamajabudhabi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-user" />
                  Login
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* India Time Display */}
      {/* <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
        <img
          src="/assets/images/header/flag-ind.png"
          alt="India Flag"
          style={{ width: "20px", marginRight: "5px" }}
        />
        {indiaTime}
      </div> */}
    </>
  );
}
