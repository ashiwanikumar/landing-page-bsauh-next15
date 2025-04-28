import React from "react";
import { NextSeo } from "next-seo";
import { Breadcrumb, Row, Col } from "antd";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";

const Events = () => {
  const socialMediaLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/BiharSamajAbuDhabiOfficial",
      iconClassName: "fab fa-facebook-f",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/biharsamajabudhabi_official/",
      iconClassName: "fab fa-instagram",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@biharsamajabudhabi",
      iconClassName: "fab fa-tiktok",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/samaj_bihar",
      iconClassName: "fab fa-twitter",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
      iconClassName: "fab fa-linkedin-in",
    },
  ];

  return (
    <>
      <NextSeo
        title="Event Gallery | Bihar Samaj Abu Dhabi - Celebrating Culture and Community"
        description="Discover the vibrant culture and community spirit of Bihar Samaj Abu Dhabi through our Event Gallery. Explore captivating images and videos showcasing our latest cultural gatherings, social events, and traditional celebrations in Abu Dhabi. Dive into the heart of Bihar, Jharkhand, and Uttar Pradesh's heritage, and relive the memorable moments with us."
        canonical="https://www.biharsamajabudhabi.com/events/event-gallery"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/events/event-gallery",
          title:
            "Event Gallery | Bihar Samaj Abu Dhabi - Celebrating Culture and Community",
          description:
            "Discover and participate in the diverse cultural and social events organized by Bihar Samaj Abu Dhabi. Experience the richness of Bihar, Jharkhand, and Uttar Pradesh (UP) traditions in the UAE.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/event-gallery/event-gallery-bsad.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi cultural event - attendees immersed in traditional activities and celebrations",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Event Gallery | Bihar Samaj Abu Dhabi - Celebrating Culture and Community",
          description:
            "Discover the vibrant culture and community spirit of Bihar Samaj Abu Dhabi through our Event Gallery. Explore captivating images and videos showcasing our latest cultural gatherings, social events, and traditional celebrations in Abu Dhabi. Dive into the heart of Bihar, Jharkhand, and Uttar Pradesh's heritage, and relive the memorable moments with us.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/event/event-gallery/event-gallery-bsad.png",
        }}
        additionalLinkTags={[
          {
            rel: "me",
            href: "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
          },
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
          {
            rel: "me",
            href: "https://www.instagram.com/biharsamajabudhabi_official",
          },
          {
            rel: "me",
            href: "https://twitter.com/samaj_bihar",
          },
          {
            rel: "me",
            href: "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
          },
        ]}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Bihar Cultural Events, Social Gatherings UAE, Indian Community Events, Bihar Samaj Abu Dhabi, Traditional Celebrations, Cultural Festivals, Community Networking, Indian Expats in UAE, Bihar Jharkhand Uttar Pradesh Heritage",
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
            name: "language",
            content: "English",
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
            content: "201164943018968", // Your Facebook App ID
          },
        ]}
      />

      <LayoutOne title="Events list">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Event Gallery:</Breadcrumb.Item>
          </Breadcrumb>

          <div className="event-code-title">Explore the Event Gallery </div>

          <div className="gallery-info-card-event">
            For event Gallery please explore our social media. Here you can find
            all galleries and videos related to our events.
          </div>

          <Row gutter={24} className="social-media-cards-event">
            {socialMediaLinks.map((link, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                style={{ marginBottom: 24 }}
              >
                <div className="social-media-card">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <i className={link.iconClassName}></i>
                    <span>{link.name}</span>
                  </a>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default Events;
