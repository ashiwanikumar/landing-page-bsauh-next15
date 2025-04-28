import React from "react";
import ZoomSlider from "./ZoomSlider/ZoomSlider";

function HeroSliderFour({ data }) {
  const defaultSliderData = [
    {
      image: "/assets/images/about-us/about-auh.png", // URL of your default image
      image: "/assets/images/about-us/3.png", // URL of your default image
      image: "/assets/images/about-us/4.png", // URL of your default image
      image: "/assets/images/about-us/5.png", // URL of your default image
      image: "/assets/images/about-us/6.png", // URL of your default image
      alt: "Default Slider Image",
      titleCaption: "Welcome to Bihar Samaj Abu Dhabi!",
      description:
        "🤝 Become a part of Bihar Samaj Abu Dhabi - where every member is family. Together, let's create a legacy of cultural harmony and community spirit. ❤️",
    },
  ];

  const sliderData = data && data.length > 0 ? data : defaultSliderData;

  return (
    <div
      style={{
        color: "#FFF",
      }}
    >
      <ZoomSlider sliderData={sliderData} />
    </div>
  );
}

export default React.memo(HeroSliderFour);
