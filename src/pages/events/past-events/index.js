import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Row, Col, Breadcrumb, Pagination } from "antd";
import axios from "axios";
import { LayoutOne, Container, EventSidebar, EventPost } from "@components";
import { useRouter } from "next/router";
import Head from "next/head";

const PastEvents = ({
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

  // JSON-LD structured data for SEO enhancement
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Event",
    name: "Past Events of Bihar Samaj Abu Dhabi",
    description:
      "Explore the rich history of Bihar Samaj's cultural and social events in Abu Dhabi.",
    url: "https://www.biharsamajabudhabi.com/events/past-events",
    location: {
      "@type": "Place",
      name: "Bihar Samaj Abu Dhabi Event Venue",
      address: "Abu Dhabi, United Arab Emirates",
    },
    image: [
      "https://www.biharsamajabudhabi.com/assets/images/event/past-events/past-event-bsad.png",
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
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@biharsamajabudhabi.com",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["English", "Hindi"],
      },
    },
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700); // Simulate loading for 1 second

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  return (
    <>
      <NextSeo
        title="Past Events of Bihar Samaj Abu Dhabi | Cultural & Social Heritage"
        description="Explore the rich history of Bihar Samaj's cultural and social events in Abu Dhabi. Relive the memorable moments and celebrate the heritage of the Bihar, Jharkhand, and Uttar Pradesh communities in the UAE."
        canonical="https://www.biharsamajabudhabi.com/events/past-events"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/events/past-events",
          title:
            "Past Events of Bihar Samaj Abu Dhabi | Cultural & Social Heritage",
          description:
            "Explore the rich history and memorable moments of Bihar Samaj's cultural and social events in Abu Dhabi. Celebrate the heritage and traditions of the Bihar, Jharkhand, and Uttar Pradesh communities.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/event/past-events/past-event-bsad.png",
              width: 1200,
              height: 630,
              alt: "Memorable Cultural Events of Bihar Samaj Abu Dhabi",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Past Events of Bihar Samaj Abu Dhabi | Cultural & Social Heritage",
          description:
            "Explore the memorable moments and rich history of Bihar Samaj's cultural and social events in Abu Dhabi.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/event/past-events/past-event-bsad.png",
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
              "Bihar Samaj Abu Dhabi, Past Events, Cultural History, Social Heritage, Bihar Community UAE, Jharkhand, Uttar Pradesh, Indian Expats, Cultural Celebrations, Abu Dhabi Heritage",
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
                          isPast={true}
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/events-approved-past-paginated?page=${page}`
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

export default PastEvents;
