import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Card, Col } from "antd";
import Container from "../../components/other/Container";

const YouTubeVideo = ({ videoUrl }) => {
  return (
    <Container>
      <Col span={24} className="social-custom-card">
        <Card className="youtube-card" style={{ border: "none" }}>
          <ReactPlayer
            url={videoUrl}
            loop
            muted
            playing={true}
            controls={true}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <div style={{ paddingTop: "56.25%" }} /> {/* Aspect Ratio */}
        </Card>
      </Col>
    </Container>
  );
};

export default YouTubeVideo;
