import React from "react";
// JSX
import HeroSlider, { Slide, Nav, OverlayContainer } from "hero-slider";
import Wrapper from "../UI/Wrapper/Wrapper";
import Title from "../UI/Title/Title";
import Subtitle from "../UI/Subtitle/Subtitle";
function HeroSliderFour({ data }) {
  // Fallback slider data in case none is provided via props
  const defaultSliderData = [
    {
      image: "/assets/images/about-us/about-auh.png",
      alt: "Welcome to Bihar Samaj Abu Dhabi",
      titleCaption: "Welcome to Bihar Samaj Abu Dhabi!",
      description:
        "🤝 Become a part of Bihar Samaj Abu Dhabi - where every member is family. Together, let's create a legacy of cultural harmony and community spirit. ❤️",
    },
    {
      image: "/assets/images/about-us/3.png",
      alt: "Our Events",
      titleCaption: "Explore Our Events",
      description:
        "Join our vibrant events that bring together culture and community.",
    },
    {
      image: "/assets/images/about-us/4.png",
      alt: "Community Engagement",
      titleCaption: "Community Engagement",
      description:
        "Get involved in our community initiatives and make a difference.",
    },
    {
      image: "/assets/images/about-us/5.png",
      alt: "Cultural Programs",
      titleCaption: "Cultural Programs",
      description:
        "Experience the richness of Bihar's culture through our diverse programs.",
    },
    {
      image: "/assets/images/about-us/6.png",
      alt: "Join Us",
      titleCaption: "Join Us Today",
      description:
        "Become a member of our community and contribute to our collective goals.",
    },
  ];

  const sliderData = data && data.length > 0 ? data : defaultSliderData;

  return (
    <HeroSlider
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide, nextSlide)
      }
      onChange={(nextSlide) => console.log("onChange", nextSlide)}
      onAfterChange={(nextSlide) => console.log("onAfterChange", nextSlide)}
      style={{
        backgroundColor: "#000",
      }}
      settings={{
        slidingDuration: 500,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 5000,
        height: "85vh",
      }}
    >
      {sliderData.map((slide, index) => (
        <Slide
          key={index}
          navDescription={slide.alt}
          background={{
            backgroundImage: slide.image,
            backgroundAnimation: "zoom",
          }}
        >
          <OverlayContainer>
            <Wrapper>
              <Title>{slide.titleCaption}</Title>
              <Subtitle>{slide.description}</Subtitle>
            </Wrapper>
          </OverlayContainer>
        </Slide>
      ))}
      <Nav />
    </HeroSlider>
  );
}

export default React.memo(HeroSliderFour);
