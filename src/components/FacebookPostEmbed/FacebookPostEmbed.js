import React from "react";
import PropTypes from "prop-types";

const FacebookPostEmbed = ({ postUrl }) => {
  return (
    <div className="facebook-post-embed">
      <iframe
        src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
          postUrl
        )}&show_text=true&width=500`}
        width="100%"
        height="800"
        style={{
          border: "none",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

FacebookPostEmbed.propTypes = {
  postUrl: PropTypes.string.isRequired,
};

export default FacebookPostEmbed;
