import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Breadcrumb, Row, Col, Button, Carousel } from "antd";
import {
  LayoutOne,
  Container,
  SectionTitle,
  TestimonialArea,
} from "@components";
import { CountUp } from "use-count-up";
import Head from "next/head";

function MemberCounter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const counterPosition =
        document.getElementById("member-counter").offsetTop;
      if (scrollPosition >= counterPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="member-counter" id="member-counter">
      <div className="member-counter__circle">
        <svg className="member-counter__svg" viewBox="0 0 36 36">
          <path
            className="member-counter__path-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="2.5"
          />
          <path
            className="member-counter__path"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ff4500"
            strokeWidth="2.5"
            strokeDasharray="100, 100"
            strokeDashoffset="100"
          />
        </svg>
        <div className="member-counter__content">
          {isVisible && (
            <CountUp
              isCounting
              start={0}
              end={1000}
              duration={3}
              suffix="+"
              className="member-counter__number"
            />
          )}
          <span className="member-counter__label">Members</span>
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  // JSON-LD structured data for SEO enhancement
  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Bihar Samaj Abu Dhabi",
    url: "https://www.biharsamajabudhabi.com",
    logo: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
    sameAs: [
      "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
      "https://www.instagram.com/biharsamajabudhabi_official",
      "https://twitter.com/samaj_bihar",
      "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
      "https://www.threads.net/@biharsamajabudhabi_official",
      "https://www.tiktok.com/@biharsamajabudhabi",
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
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Head>

      <NextSeo
        title="About Us | Bihar Samaj Abu Dhabi - Bridging Cultures"
        description="Discover Bihar Samaj Abu Dhabi, a community that epitomizes cultural unity in the UAE. 'We may not live in Bihar, Jharkhand, and Uttar Pradesh, but their spirit lives in us.' Join us in celebrating the rich traditions and vibrant heritage of Bihar, Jharkhand, and Uttar Pradesh as we bridge cultures and build a supportive community environment."
        canonical="https://www.biharsamajabudhabi.com/about/about-us"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/about/about-us",
          title: "About Us | Bihar Samaj Abu Dhabi - Bridging Cultures",
          description:
            "Discover Bihar Samaj Abu Dhabi, a community symbolizing cultural unity in the UAE. Join us in celebrating the rich heritage of Bihar, Jharkhand, and Uttar Pradesh.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/websiteaboutus/bsadabout.png", // Replace with the URL of your desired image
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi About Us",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "About Us | Bihar Samaj Abu Dhabi - Bridging Cultures",
          description:
            "Discover Bihar Samaj Abu Dhabi, a community symbolizing cultural unity in the UAE. Join us in celebrating the rich heritage of Bihar, Jharkhand, and Uttar Pradesh.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/websiteaboutus/bsadabout.png", // Replace with the URL of your desired image for the About Us page
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
              "Bihar Samaj Abu Dhabi, Cultural Unity UAE, Bihar Culture, Jharkhand Culture, UP Culture, Community Events, Cultural Festivals, Indian Community UAE, Bihar Heritage",
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

      <LayoutOne title="About Us">
        <Container>
          <Breadcrumb separator=">">{/* ... Breadcrumb items */}</Breadcrumb>
        </Container>

        {/* Hero Section */}
        <div className="hero">
          <div className="hero__image">
            <img
              src="/assets/images/about-us/about-auh.png"
              alt="Bihar Samaj Abu Dhabi"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          <div className="hero__content">
            <h1 className="hero__title">Welcome to Bihar Samaj Abu Dhabi</h1>
            {/* Using SectionTitle for Slogan */}
            <SectionTitle
              title="We may not live in Bihar, Jharkhand, and Uttar Pradesh, but their spirit lives in us."
              className="-center"
            />
            <Button
              type="primary"
              size="large"
              className="about-join"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/registration`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Join Our Community
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="about">
          <Container>
            <Row gutter={40}>
              <Col xs={24} md={12}>
                <div className="about__content">
                  <SectionTitle
                    title="About Bihar Samaj Abu Dhabi"
                    className="-left"
                  />
                  <p>
                    Established on February 1, 2019, Bihar Samaj Abu Dhabi is a
                    community that symbolizes cultural unity, representing the
                    rich cultures of Bihar, Jharkhand, and Uttar Pradesh (UP) in
                    the UAE.
                  </p>
                  <p>
                    Our community organizes various cultural events and
                    festivals, highlighting the unique traditions of our
                    homeland, from vibrant Holi festivities to the serene Chhath
                    Puja.
                  </p>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="about__image">
                  <img
                    src="/assets/images/about-us/about-image.png"
                    alt="About Bihar Samaj Abu Dhabi"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Community Support Section */}
        <div className="community-support">
          <Container>
            <Row gutter={40}>
              <Col span={24}>
                <div
                  style={{
                    background: "#fff",
                    padding: 24,
                    borderRadius: 8,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <SectionTitle title="Our Community Support" />
                  <p>
                    Our community is a beacon of support, offering assistance in
                    areas like job search, housing, and social welfare. We aim
                    to create a nurturing environment for our members in United
                    Arab Emirates, helping them to thrive in all aspects of
                    life.
                  </p>
                  <p>
                    We invite individuals from Bihar, Jharkhand, and Uttar
                    Pradesh to join our flourishing international community,
                    where each culture is valued and celebrated.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Mission and Vision */}
        <div className="mission-vision">
          <Container>
            <Row gutter={40}>
              <Col xs={24} md={12}>
                <div className="mission-vision__card">
                  <SectionTitle title="Our Mission" className="-left" />
                  <p>
                    To build a vibrant community that supports the well-being,
                    cultural integration, and success of our members from Bihar,
                    Jharkhand, and Uttar Pradesh in the UAE.
                  </p>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="mission-vision__card">
                  <SectionTitle title="Our Vision" className="-left" />
                  <p>
                    To be a leading community organization that acts as a bridge
                    between the traditions of our homelands and the global
                    diaspora.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          {/* Include MemberCounter Component here */}
          <div className="member-card">
            <Container>
              <Row gutter={40}>
                <Col span={24}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      borderRadius: 8,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <SectionTitle title="Our Growing Community in Abu Dhabi" />
                    <MemberCounter />
                    <p>
                      With over 1000+ members, our community thrives by
                      supporting each other in areas such as job opportunities,
                      housing, and social services. We're committed to fostering
                      a nurturing environment in the UAE.
                    </p>
                    <p>
                      Whether you hail from Bihar, Jharkhand, or Uttar Pradesh,
                      join us to celebrate and preserve our cultural heritage
                      while flourishing together in the UAE.
                    </p>
                    <p>
                      Recognized as the fastest-growing Indian community in Abu
                      Dhabi, Bihar Samaj Abu Dhabi serves as a vibrant hub for
                      cultural and social integration, offering a dynamic
                      platform for our members to connect, collaborate, and
                      succeed.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        {/* Testimonial Area Preview */}
        <TestimonialArea />
      </LayoutOne>
    </>
  );
}

export default React.memo(AboutUs);
