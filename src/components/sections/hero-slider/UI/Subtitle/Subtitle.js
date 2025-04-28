import React from "react";
import PropTypes from "prop-types";

const Subtitle = (props) => {
  // Define inline styles
  const containerStyle = {
    margin: "24px auto 0",
    padding: "10px 20px",
    width: "80%",
    textAlign: "center",
    fontSize: "1.95rem", // Default size for larger screens
    fontWeight: "800",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    color: "#333",
  };

  // Media queries for responsive adjustments
  const responsiveStyles = {
    "@media (max-width: 768px)": {
      // Tablets and down
      fontSize: "1.5rem",
    },
    "@media (max-width: 480px)": {
      // Mobile devices
      fontSize: "1.25rem",
    },
  };

  return (
    <h2 style={{ ...containerStyle, ...responsiveStyles }}>{props.children}</h2>
  );
};

Subtitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Subtitle;
