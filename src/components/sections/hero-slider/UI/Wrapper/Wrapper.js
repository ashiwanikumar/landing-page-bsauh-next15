import React from "react";
import PropTypes from "prop-types";

const wrapper = (props) => {
  // Define inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    pointerEvents: "none",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  return <div style={containerStyle}>{props.children}</div>;
};

wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.any, // This will cover any type of children, including strings, numbers, elements, etc.
    PropTypes.object,
    PropTypes.element,
  ]),
};

export default wrapper;
