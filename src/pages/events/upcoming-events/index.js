import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Row, Col, Breadcrumb, Pagination } from "antd";
import axios from "axios";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import EventSidebar from "../../../components/event/EventSidebar";
import EventPost from "../../../components/post/EventPost";
import { useRouter } from "next/router";
import Head from "next/head";

const UpcomingEvents = ({
  events,
  paginationData,
  eventCategories,
  eventTags,
  recentEvents,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(Number(router.query.page || 1));

  const onPaginationChange = (current) => {
    setPage(current);
    router.push(`/event?page=${current}`);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700); // Simulate loading for 1 second

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  // JSON-LD structured data for SEO enhancement
  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Event",
    name: "Upcoming Bihar Samaj Events in Abu Dhabi",
    description:
      "Join the exciting upcoming events hosted by Bihar Samaj in Abu Dhabi. Experience the rich cultural and social heritage of Bihar, Jharkhand, and Uttar Pradesh with us in the UAE.",
    url: "https://www.biharsamajabudhabi.com/events/upcoming-events",
    location: {
      "@type": "Place",
      name: "Bihar Samaj Abu Dhabi",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Specific location details",
        addressLocality: "Abu Dhabi",
        addressRegion: "UAE",
      },
    },
    image: [
      "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
    ],
    organizer: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      url: "https://www.biharsamajabudhabi.com",
      sameAs: [
        "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
        "https://www.instagram.com/biharsamajabudhabi_official",
        "https://twitter.com/samaj_bihar",
        "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
        "https://www.threads.net/@biharsamajabudhabi_official",
        "https://www.youtube.com/@BiharSamajAbudhabiOffical",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "info@biharsamajabudhabi.com",
          contactType: "customer service",
          areaServed: "AE",
          availableLanguage: "English",
        },
      ],
    },
  };

  return (
    <>
      <NextSeo
        title="Upcoming Bihar Samaj Events in Abu Dhabi | Cultural & Social Gatherings"
        description="Join the exciting upcoming events hosted by Bihar Samaj in Abu Dhabi. Immerse yourself in the rich cultural and social traditions of Bihar, Jharkhand, and Uttar Pradesh right here in the UAE."
        canonical="https://www.biharsamajabudhabi.com/events/upcoming-events"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/events/upcoming-events",
          title:
            "Upcoming Bihar Samaj Events in Abu Dhabi | Cultural & Social Gatherings",
          description:
            "Join the exciting upcoming events hosted by Bihar Samaj in Abu Dhabi. Discover the vibrant cultural and social traditions of Bihar, Jharkhand, and Uttar Pradesh with our community in the UAE.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
              width: 1200,
              height: 630,
              alt: "Upcoming Bihar Samaj Cultural Events in Abu Dhabi",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Upcoming Bihar Samaj Events in Abu Dhabi | Cultural & Social Gatherings",
          description:
            "Join the exciting upcoming events hosted by Bihar Samaj in Abu Dhabi. Experience the rich cultural and social heritage of Bihar, Jharkhand, and Uttar Pradesh with us in the UAE.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/event/upcoming-events/upcoming-event-bsad.png",
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
              "Bihar Samaj Abu Dhabi, Upcoming Events, Cultural Events, Social Gatherings, Indian Community Events, Bihar Culture, Jharkhand, Uttar Pradesh, Indian Expats in UAE, Cultural Heritage, Abu Dhabi Events",
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

      <Head>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
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
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Heritage Celebrations:</Breadcrumb.Item>
          </Breadcrumb>

          <div className="event-code-title">
            Bihar Samaj Community Gatherings:{" "}
          </div>

          <div className="event">
            <Row gutter={30}>
              <Col xs={24} lg={6}>
                <EventSidebar
                  recentEvents={recentEvents}
                  eventCategories={eventCategories}
                  eventTags={eventTags}
                />
              </Col>

              <Col xs={24} lg={18}>
                <div className="event-content">
                  <div className="event-cards-container">
                    {events?.length > 0 ? (
                      events?.map((item, _) => (
                        <EventPost
                          type="column-full"
                          data={item}
                          isPast={
                            new Date() >
                              new Date(item.registrationDetails.closingDate) ||
                            new Date() > new Date(item.eventDate)
                          }
                        />
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 30,
                        }}
                      >
                        <div class="no-event-card">
                          <h1>
                            No events are listed right now! Keep an eye on this
                            space for new additions soon!
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {events?.length > 0 && (
                  <Pagination
                    onChange={onPaginationChange}
                    defaultCurrent={page}
                    pageSize={paginationData.perPage}
                    total={paginationData.totalEvents}
                  />
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </LayoutOne>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const page = query.page ? query.page : 1;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/events-approved-upcoming-paginated?page=${page}`
    );

    const response = res.data;
    // Pass the response data as props
    return { props: response };
  } catch (error) {
    console.error("FETCH_EVENTS_ERROR", error);

    // Return empty props in case of an error
    return { props: {} };
  }
}

export default UpcomingEvents;
