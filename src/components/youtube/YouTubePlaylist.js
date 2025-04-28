import React, { useState, useEffect } from "react";
import { fetchPlaylistVideos } from "../../components/youtube/youtubeService";
import ReactPlayer from "react-player";
import { Card, Col, Modal, Spin } from "antd";

const YouTubePlaylist = () => {
  const [videos, setVideos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const videoItems = await fetchPlaylistVideos();
        if (videoItems) {
          setVideos(videoItems);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  const showModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <Spin size="large" className="w-full py-8" />;
  if (error)
    return <div className="text-red-500">Error loading videos: {error}</div>;

  // Remove this condition since videos are available
  // if (!videos?.length) return <div>No videos available</div>;

  return (
    <Col span={24} className="social-custom-card youtube-playlist">
      {videos?.map((video) => (
        <Card
          key={video.snippet.resourceId.videoId}
          className="youtube-playlist-card"
          hoverable
          cover={
            <img
              alt={video.snippet.title}
              src={video.snippet.thumbnails.medium.url}
            />
          }
          onClick={() =>
            showModal(
              `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`
            )
          }
        >
          <Card.Meta title={video.snippet.title} />
        </Card>
      ))}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width="80%"
      >
        <ReactPlayer
          url={currentVideoUrl}
          playing
          controls
          width="100%"
          height="calc(80vh - 200px)"
        />
      </Modal>
    </Col>
  );
};

export default YouTubePlaylist;
