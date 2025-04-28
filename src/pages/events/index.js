import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Row, Col, Breadcrumb, Card } from "antd";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import { useRouter } from "next/router";
import Head from "next/head";

const Events = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Images URLs
  const eventBG = "/assets/images/event/bsad.png";
  const eventGallery =
    "/assets/images/event/event-gallery/event-gallery-bsad.png";
  const eventUpcoming =
    "/assets/images/event/upcoming-events/upcoming-event-bsad.png";
  const eventPast = "/assets/images/event/past-events/past-event-bsad.png";

  const navigateTo = (url) => {
    router.push(url);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  // JSON-LD structured data for SEO enhancement
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Event",
    name: "Explore Events & Cultural Heritage with Bihar Samaj Abu Dhabi",
    description:
      "Dive into the heart of Bihar culture in the UAE with our upcoming events, relive the joy through past event highlights, and browse our event gallery for a glimpse into our vibrant community gatherings.",
    url: "https://www.biharsamajabudhabi.com/events",
    location: {
      "@type": "Place",
      name: "Bihar Samaj Abu Dhabi",
      address: "Abu Dhabi, United Arab Emirates",
    },
    image: [
      "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
      "https://www.biharsamajabudhabi.com/assets/images/event/past-events/past-event-bsad.png",
      "https://www.biharsamajabudhabi.com/assets/images/event/event-gallery/event-gallery-bsad.png",
    ],
    startDate: "2023-01-01", // Modify as per actual event dates
    endDate: "2025-12-31",
    organizer: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      url: "https://www.biharsamajabudhabi.com",
      sameAs: [
        "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
        "https://www.instagram.com/biharsamajabudhabi_official",
        "https://twitter.com/samaj_bihar",
        "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
        "https://www.youtube.com/@BiharSamajAbudhabiOffical",
        "https://www.threads.net/@biharsamajabudhabi_official",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@biharsamajabudhabi.com",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Hindi"],
      },
    },
  };

  return (
    <>
      <NextSeo
        title="Explore Events & Cultural Heritage with Bihar Samaj Abu Dhabi"
        description="Dive into the heart of Bihar culture in the UAE with our upcoming events, relive the joy through past event highlights, and browse our event gallery for a glimpse into our vibrant community gatherings."
        canonical="https://www.biharsamajabudhabi.com/events"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/events",
          title:
            "Explore Events & Cultural Heritage with Bihar Samaj Abu Dhabi",
          description:
            "Dive into the heart of Bihar culture in the UAE with our upcoming events, relive the joy through past event highlights, and browse our event gallery for a glimpse into our vibrant community gatherings.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
              width: 1200,
              height: 630,
              alt: "Upcoming Bihar Samaj Event Preview",
            },
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/past-events/past-event-bsad.png",
              width: 1200,
              height: 630,
              alt: "Highlights from Past Bihar Samaj Events",
            },
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/event-gallery/event-gallery-bsad.png",
              width: 1200,
              height: 630,
              alt: "Preview of Bihar Samaj Abu Dhabi Event Gallery",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Explore Events & Cultural Heritage with Bihar Samaj Abu Dhabi",
          description:
            "Dive into the heart of Bihar culture in the UAE with our upcoming events, relive the joy through past event highlights, and browse our event gallery for a glimpse into our vibrant community gatherings.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://www.biharsamajabudhabi.com/img/icon/favicon/favicon.ico",
          },
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
          {
            rel: "me",
            href: "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
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
              "Bihar Samaj Abu Dhabi, Upcoming Cultural Events, Past Event Highlights, Event Gallery, Bihar Culture in UAE, Indian Community Events in Abu Dhabi, Cultural Gatherings, Social Events, Heritage Celebrations, Bihar, Jharkhand, Uttar Pradesh Traditions, Indian Expats in UAE",
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
            content: "201164943018968",
          },
        ]}
      />

      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      {isLoading && ( // Here, use the correct state variable
        <div className="loading-overlay-event">
          <div className="loading-spinner-event"></div>
        </div>
      )}
      <LayoutOne title="Events list">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Heritage Celebrations</Breadcrumb.Item>
          </Breadcrumb>
          <div className="event-code-title">
            Celebrating the rich tapestry of Bihar, Jharkhand, and UP cultures
            in Abu Dhabi with engaging events and gatherings.
          </div>
          <div
            style={{
              backgroundImage: `url(${eventBG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
            }}
          >
            <Row gutter={30}>
              <Col span={8}>
                <Card
                  className="event-card"
                  cover={<img alt="Upcoming Events" src={eventUpcoming} />}
                  title="Upcoming Events"
                  onClick={() => navigateTo("/events/upcoming-events")}
                >
                  <div className="explore-button-event">Explore</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="event-card"
                  cover={<img alt="Past Events" src={eventPast} />}
                  title="Past Events"
                  onClick={() => navigateTo("/events/past-events")}
                >
                  <div className="explore-button-event">Explore</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="event-card"
                  cover={<img alt="Event Gallery" src={eventGallery} />}
                  title="Event Gallery"
                  onClick={() => navigateTo("/events/event-gallery")}
                >
                  <div className="explore-button-event">Explore</div>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </LayoutOne>
    </>
  );
};

export default Events;
