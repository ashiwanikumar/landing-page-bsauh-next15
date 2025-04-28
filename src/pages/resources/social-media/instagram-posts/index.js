import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Col,
  Row,
  Image,
  Card,
  Skeleton,
  Avatar,
  Button,
} from "antd";
import { FaInstagram } from "react-icons/fa";
import { NextSeo } from "next-seo";
import LayoutOne from "../../../../components/layout/LayoutOne";
import Container from "../../../../components/other/Container";

export default function InstagramGallery() {
  const [instagramImages, setInstagramImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [qrCodeVisible, setQrCodeVisible] = useState(true);
  const postsPerPage = 12; // Number of posts to display per page
  const profilePictureUrl =
    "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png";

  const QRCodeImages = [
    {
      name: "instagram",
      image: "/assets/images/qr-code/instagram_qr_code.png",
    },
  ];

  const fetchInstagramMedia = async () => {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const fields = "id,media_type,media_url,permalink,caption";
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
      );
      setInstagramImages(response.data.data);
      setDisplayedImages(response.data.data.slice(0, postsPerPage)); // Display initial posts
    } catch (error) {
      console.error("Failed to fetch Instagram media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramMedia();
    const timer = setTimeout(() => {
      setQrCodeVisible(false); // Automatically hide QR code after 15 seconds
    }, 15000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleCloseQrCode = () => {
    setQrCodeVisible(false);
  };

  const renderCardContent = (item, index) => {
    let caption = item.caption || "";
    caption =
      caption.length > 250 ? `${caption.substring(0, 250)}...` : caption;

    // Splitting the caption into parts to identify hashtags
    const captionParts = caption.split(/(\s+)/).map((part, i) => {
      // Check if the part is a hashtag
      if (part.startsWith("#")) {
        // Style hashtags differently
        return (
          <span
            key={i}
            className="hashtag"
            style={{
              color: "#119721",
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });

    return (
      <div className="card-content">
        {item.media_type === "VIDEO" ? (
          <video controls style={{ width: "100%", height: "auto" }}>
            <source src={item.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={item.media_url}
            alt={`Instagram post ${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        <p className="caption">{captionParts}</p>{" "}
        {/* Render caption parts including styled hashtags */}
      </div>
    );
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const nextSetOfImages = instagramImages.slice(0, postsPerPage * nextPage);
    setDisplayedImages(nextSetOfImages);
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <NextSeo
        title="Explore Bihar Samaj Abu Dhabi on Instagram"
        description="Dive into our Instagram feed to catch a glimpse of the vibrant Bihar Samaj community in Abu Dhabi. From cultural events to community gatherings, see it all through our posts and stories."
        canonical="https://www.biharsamajabudhabi.com/resources/social-media/instagram-posts"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/resources/social-media/instagram-posts",
          title: "Explore Bihar Samaj Abu Dhabi on Instagram",
          description:
            "Dive into our Instagram feed to catch a glimpse of the vibrant Bihar Samaj community in Abu Dhabi. From cultural events to community gatherings, see it all through our posts and stories.",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-instagram-page/main.jpg",
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi Instagram Highlights",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Explore Bihar Samaj Abu Dhabi on Instagram",
          description:
            "Dive into our Instagram feed to catch a glimpse of the vibrant Bihar Samaj community in Abu Dhabi. From cultural events to community gatherings, see it all through our posts and stories.",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-instagram-page/main.jpg",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
        ]}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Bihar Samaj Abu Dhabi, Instagram, Cultural Celebrations, Community Events, Social Media Engagement, Abu Dhabi Indian Community",
          },
          {
            name: "author",
            content: "Bihar Samaj Abu Dhabi",
          },
          {
            name: "robots",
            content: "index, follow",
          },
          {
            name: "googlebot",
            content: "index, follow",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
          {
            httpEquiv: "Content-Type",
            content: "text/html; charset=utf-8",
          },
          {
            property: "fb:app_id",
            content: "201164943018968",
          },
          {
            name: "theme-color",
            content: "#ffffff",
          },
        ]}
      />

      <LayoutOne title="Instagram Gallery">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Explore the heart and soul of the Bihar Samaj Abu Dhabi community:{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="qr-code-title">
            Showcasing the Vibrant Bihar Samaj Abu Dhabi Community
          </div>

          <Row gutter={[16, 16]}>
            {loading ? (
              Array.from(new Array(6)).map((_, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  key={index}
                  className="instagram-gallery-skeleton"
                >
                  <Card className="instagram-skeleton-card">
                    <Skeleton avatar paragraph={{ rows: 4 }} active />
                  </Card>
                </Col>
              ))
            ) : instagramImages.length === 0 ? (
              <div>No Instagram images found</div>
            ) : (
              displayedImages.map((item, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card className="instagram-post-card">
                    <div className="card-header">
                      <Avatar
                        src={profilePictureUrl}
                        size={40}
                        style={{
                          marginRight: "12px",
                        }}
                      />
                      <span className="username">Bihar Samaj Abu Dhabi</span>{" "}
                      {/* Dynamically replace as needed */}
                    </div>
                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "black",
                      }}
                    >
                      {renderCardContent(item, index)}
                    </a>
                  </Card>
                </Col>
              ))
            )}
            {instagramImages.length > displayedImages.length && (
              <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleLoadMore}>
                  Load More
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </LayoutOne>

      {/* QR Code Modal */}
      {qrCodeVisible && (
        <div className="qr-code-modal">
          <div className="qr-code-overlay" onClick={handleCloseQrCode}></div>
          <div className="qr-code-card">
            <Image
              src="/assets/images/qr-code/instagram_qr_code.png"
              alt="Instagram QR Code"
              preview={false}
            />
            <div className="instagram-follow">
              <i className="instagram-icon">
                <FaInstagram />
              </i>{" "}
              {/* Placeholder for an actual icon */}
              <p className="qr-code-text">
                Follow us on Instagram or scan to follow
              </p>
            </div>
            <div className="qr-code-close-symbol" onClick={handleCloseQrCode}>
              ×
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
