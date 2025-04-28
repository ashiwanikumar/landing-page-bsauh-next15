import React from "react";
import PropTypes from "prop-types";

const navbar = (props) => {
  // Define inline styles
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    margin: "0 auto",
    padding: "0",
    width: "100%",
    height: "70px",
    borderBottom: "1px solid rgba(215, 225, 235, 0.6)",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
  };

  const mainStyle = {
    textTransform: "uppercase",
  };

  const linkStyle = {
    cursor: "pointer",
    margin: "0 12px",
  };

  const linksContainerStyle = {
    fontSize: "0.7rem", // This is the default font size for links, but it should only apply on small screens
  };

  // Apply media query styles dynamically
  const updateLinksContainerStyle = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 644) {
      return { ...linksContainerStyle };
    } else {
      return { fontSize: "1rem" }; // Default font size for larger screens
    }
  };

  return (
    <nav style={containerStyle}>
      <span style={mainStyle}>Fake Navbar</span>
      <div style={updateLinksContainerStyle()}>
        <span style={linkStyle}>Home</span>
        <span style={linkStyle}>Link A</span>
        <span style={linkStyle}>Link B</span>
      </div>
      {props.children}
    </nav>
  );
};

navbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default navbar;
