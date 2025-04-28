import React from "react";
import PropTypes from "prop-types";

const Title = (props) => {
  // Define inline styles
  const containerStyle = {
    margin: "0 auto",
    padding: "10px 20px",
    textTransform: "uppercase",
    width: "90%",
    textAlign: "center",
    fontSize: "3.5rem", // Default size for larger screens
    fontWeight: 600,
    background: "linear-gradient(to right, #08ca3f, #0f130c, #49924d)",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    color: "#ffffff",
    textShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  };

  // Media queries for responsive adjustments
  const responsiveStyles = {
    "@media (max-width: 768px)": {
      // Tablets and down
      fontSize: "2.5rem",
    },
    "@media (max-width: 480px)": {
      // Mobile devices
      fontSize: "1.75rem",
    },
  };

  return (
    <h1 style={{ ...containerStyle, ...responsiveStyles }}>{props.children}</h1>
  );
};

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Title;
