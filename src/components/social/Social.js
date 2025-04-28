import React from "react";
import { SocialIcon } from "react-social-icons";

const Social = () => {
  return (
    <div className="sticky-container">
      <ul className="sticky">
        <li>
          <SocialIcon
            url="https://www.facebook.com/BiharSamajAbuDhabiOfficial"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
        <li>
          <SocialIcon
            url="https://twitter.com/samaj_bihar"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
        <li>
          <SocialIcon
            url="https://www.instagram.com/biharsamajabudhabi_official/"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
        <li>
          <SocialIcon
            url="https://in.linkedin.com/company/bihar-samaj-auh"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
        <li>
          <SocialIcon
            url="https://www.youtube.com/@biharsamajauh"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
        <li>
          <SocialIcon
            url="https://api.whatsapp.com/message/jkjskdjskdjk"
            target="_blank"
            style={{ height: 35, width: 35 }}
          />
        </li>
      </ul>
    </div>
  );
};

export default Social;
