import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Row, Col, Card } from "antd";
import { NextSeo } from "next-seo";
import LayoutOne from "../../../../components/layout/LayoutOne";
import Container from "../../../../components/other/Container";

// Text truncation component with "Read More" functionality
const TruncatedText = ({ text, maxLength = 250 }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const toggleTruncated = () => setIsTruncated(!isTruncated);

  return (
    <span>
      {isTruncated ? `${text.substring(0, maxLength)}...` : text}
      {text.length > maxLength && (
        <a
          onClick={toggleTruncated}
          style={{ marginLeft: 5, cursor: "pointer", color: "#1890ff" }}
        >
          {isTruncated ? "Read more" : "Show less"}
        </a>
      )}
    </span>
  );
};

const FacebookPagePosts = () => {
  const [posts, setPosts] = useState([]);
  const pageName = "Bihar Samaj Abu Dhabi";
  const pageLogo =
    "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png"; // Your page logo URL

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
      const pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
      const fields = "message,created_time,id,full_picture";
      const url = `https://graph.facebook.com/v19.0/${pageId}/posts?access_token=${accessToken}&fields=${fields}`;

      try {
        const response = await axios.get(url);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch Facebook posts:", error);
      }
    };

    fetchFacebookPosts();
  }, []);

  return (
    <>
      <NextSeo
        title="Facebook Posts - Bihar Samaj Abu Dhabi"
        description="Engage with our collection of Facebook posts showcasing the vibrant community and cultural events of Bihar Samaj in Abu Dhabi."
        canonical="https://www.biharsamajabudhabi.com/resources/social-media/facebook-posts"
        openGraph={{
          type: "website",
          url: "https://www.biharsamajabudhabi.com/resources/social-media/facebook-posts",
          title: "Facebook Posts - Bihar Samaj Abu Dhabi",
          description:
            "Engage with our collection of Facebook posts showcasing the vibrant community and cultural events of Bihar Samaj in Abu Dhabi.",
          images: [
            {
              url: pageLogo,
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Facebook Posts - Bihar Samaj Abu Dhabi",
          description:
            "Engage with our collection of Facebook posts showcasing the vibrant community and cultural events of Bihar Samaj in Abu Dhabi.",
          image: pageLogo,
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: pageLogo,
            sizes: "32x32",
          },
        ]}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Bihar Samaj Abu Dhabi, Facebook, Cultural Celebrations, Community Events, Social Media Engagement, Abu Dhabi Indian Community",
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
            content: "1117066602635402", // Replace with your actual Facebook App ID
          },
          {
            name: "theme-color",
            content: "#ffffff",
          },
        ]}
      />
      <LayoutOne title="Facebook Post Gallery">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Discover the Vibrant Essence of Bihar Samaj in Abu Dhabi
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="qr-code-title">
            Latest From Our Facebook Page Showcasing the Vibrant Bihar Samaj Abu
            Dhabi Community
          </div>

          <Row gutter={[16, 16]}>
            {posts.map((post, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  cover={
                    <img
                      src={post.full_picture || pageLogo}
                      alt="Post"
                      style={{ width: "100%" }}
                    />
                  }
                >
                  <Card.Meta
                    avatar={
                      <img
                        src={pageLogo}
                        alt="Page Logo"
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                      />
                    }
                    title={`${pageName} - Posted on ${new Date(
                      post.created_time
                    ).toLocaleDateString()}`}
                    description={
                      <TruncatedText
                        text={post.message || "No additional text provided."}
                      />
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default FacebookPagePosts;
