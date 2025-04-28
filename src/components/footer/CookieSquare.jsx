import React, { useState } from "react";

const CookieSquare = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    const currentTime = new Date().getTime();
    localStorage.setItem(
      "cookieAccepted",
      JSON.stringify({ accepted: true, timestamp: currentTime })
    );
    setIsVisible(false); // Hide banner
  };

  const handleDecline = () => {
    setIsVisible(false); // Hide banner
  };

  if (!isVisible) {
    return null; // Don't render anything if the banner is not visible
  }

  return (
    <div className="cookie-square">
      <div className="cookie-square__content">
        <div className="cookie-square__pulse"></div>
        <div className="cookie-square__pulse"></div>
        <div className="cookie-square__pulse"></div>

        <div className="cookie-square__abstract">
          <p>
            We use necessary cookies for functionality. With your consent, we
            may use additional cookies for site analysis and improvement. See
            our <a href="/information/privacy-policy">Privacy Policy</a> for
            more info.
          </p>
        </div>

        <div className="cookie-square__actions">
          <button
            className="button cookie-square__button"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="button cookie-square__button"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSquare;
