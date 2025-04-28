import React from "react";

const CookieBanner = ({ onHide }) => {
  const handleAccept = () => {
    const currentTime = new Date().getTime();
    localStorage.setItem(
      "cookieAccepted",
      JSON.stringify({ accepted: true, timestamp: currentTime })
    );
    onHide();
  };

  return (
    <div className="cookie-banner">
      <div className="content">
        <h3>Cookies & Privacy</h3>
        <p>
          We use necessary cookies for functionality. With your consent, we may
          use additional cookies for site analysis and improvement. See our{" "}
          <a href="/information/privacy-policy">Privacy Policy</a> for more
          info.
        </p>
        <div className="buttons">
          <button className="accept-cookies-btn" onClick={handleAccept}>
            Accept Cookies
          </button>
          <button className="required-only-btn" onClick={handleAccept}>
            Required Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
