import React from "react";
import Link from "next/link";
// import SocialIcons from "../../other/SocialIcons";

export default function FooterInformation() {
  return (
    <div className="newFooter__info">
      <Link href="/" className="newFooter__logo">
        <img src="/assets/images/logo.png" alt="BSAD Logo" />
      </Link>
      <p className="newFooter__description">
        Bihar Samaj Abu Dhabi: Uniting the Bihari community in the UAE through
        cultural celebration and mutual support.
      </p>
      <ul className="newFooter__contactList">
        <li>
          <i className="fas fa-map-marker-alt"></i>
          <span>Abu Dhabi, United Arab Emirates</span>
        </li>
        <li>
          <i className="fas fa-envelope"></i>
          <a href="mailto:info@biharsamajabudhabi.com">
            info@biharsamajabudhabi.com
          </a>
        </li>
        {/* <li>
          <i className="fas fa-phone-alt"></i>
          <a href="tel:+971XXXXXXXXX">+971 XX XXX XXXX</a>
        </li> */}
      </ul>
      {/* <SocialIcons
        type="primary"
        shape="circle"
        className="newFooter__socialIcons"
      /> */}
    </div>
  );
}
