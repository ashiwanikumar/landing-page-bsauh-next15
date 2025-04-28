import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Card, Skeleton, Button } from "antd";
import { NextSeo } from "next-seo";
import LayoutOne from "../../../../components/layout/LayoutOne";
import Container from "../../../../components/other/Container";

export default function LinkedInGallery() {
  const [linkedInPosts, setLinkedInPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example LinkedIn post IDs or URLs
  const postIds = [
    "7284388678322298880", // Add more post IDs as needed
    "7284390039784951809", // Example second post
    "7284387632292270080",
    "7284385959687708672",
    "7284249827977138177",
    "7283591247955451904",
    "7283588656970305537",
    "7283557317072052224",
    "7283515141248180225",
    "7283218084495024128",
    "7283216546531856384",
    "7283212427800776704", // Example third post
  ];

  useEffect(() => {
    // Simulate fetching LinkedIn posts
    setTimeout(() => {
      setLinkedInPosts(postIds);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="linkedin-gallery">
      <NextSeo
        title="LinkedIn Posts - Bihar Samaj Abu Dhabi"
        description="Explore our latest updates and posts on LinkedIn."
        canonical="https://www.biharsamajabudhabi.com/resources/social-media/linkedin-posts"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/resources/social-media/linkedin-posts",
          title: "LinkedIn Posts - Bihar Samaj Abu Dhabi",
          description: "Explore our latest updates and posts on LinkedIn.",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-instagram-page/main.jpg",
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi LinkedIn Posts",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
      />

      <LayoutOne title="LinkedIn Posts">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>LinkedIn Posts</Breadcrumb.Item>
          </Breadcrumb>

          <div className="linkedin-gallery-header">
            <h1>LinkedIn Posts</h1>
            <p>Stay updated with our latest news and updates on LinkedIn.</p>
          </div>

          <Row gutter={[24, 24]}>
            {loading ? (
              Array.from(new Array(3)).map((_, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card className="linkedin-post-card">
                    <Skeleton active />
                  </Card>
                </Col>
              ))
            ) : linkedInPosts.length === 0 ? (
              <div className="no-posts">No LinkedIn posts found.</div>
            ) : (
              linkedInPosts.map((postId, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card className="linkedin-post-card">
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${postId}`}
                      height="600" // Fixed height for better visibility
                      width="100%"
                      style={{ border: "none" }}
                      allowFullScreen
                      title="Embedded LinkedIn post"
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </LayoutOne>
    </div>
  );
}
