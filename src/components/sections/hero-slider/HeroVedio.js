import React, { useState } from "react";
import "../../../styles/layout/_heroSection.scss";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  return <div className="fullscreen-video-wrap"></div>;
};

export default HeroSection;
