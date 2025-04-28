// pages/partners/index.js

import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Breadcrumb } from "antd";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import SectionTitle from "../../components/other/SectionTitle";
import conferbotData from "../../components/partners/conferbot.md";
import clickerData from "../../components/partners/clickers.md";

export const partners = [
  {
    slug: "conferbot",
    name: "Conferbot",
    logo: "/img/partners/conferbot.png",
    description: "Intelligent Conversations for Enhanced Customer Support",
    category: "Technology",
    content: conferbotData, // This now contains the raw markdown text
  },
  {
    slug: "clickerclubs",
    name: "The Clickers Club",
    logo: "/img/partners/clickerclubs.jpg",
    description: "Expert Photography and Videography Services",
    category: "Media",
    content: clickerData, // This now contains the raw markdown text
  },
  // Add more partners here
];
const PartnerCard = ({ partner }) => (
  <Link href={`/partners/${partner.slug}`} className="partner-card">
    <div className="partner-card__logo-container">
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        className="partner-card__logo"
      />
    </div>
    <div className="partner-card__content">
      <h3 className="partner-card__name">{partner.name}</h3>
      <p className="partner-card__category">{partner.category}</p>
      <p className="partner-card__description">{partner.description}</p>
    </div>
  </Link>
);

const Partners = () => {
  return (
    <LayoutOne title="Our Partners">
      <NextSeo
        title="Our Partners | Bihar Samaj Abu Dhabi" // Updated title for partners page
        description="Meet our valued partners who support Bihar Samaj Abu Dhabi in bridging cultures and fostering community engagement." // Updated description for partners page
        canonical="https://www.biharsamajabudhabi.com/partners" // Updated canonical URL for partners page
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/partners",
          title: "Our Partners | Bihar Samaj Abu Dhabi",
          description:
            "Explore our partners who contribute to our mission of cultural unity and community support in the UAE.",
          site_name: "Bihar Samaj Abu Dhabi",
          type: "website", // Added og:type property
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/img/partners/partnership.png", // Cover image for partners page
              width: 1200,
              height: 630,
              alt: "Partners of Bihar Samaj Abu Dhabi",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Our Partners | Bihar Samaj Abu Dhabi",
          description:
            "Meet our partners who support Bihar Samaj Abu Dhabi in bridging cultures and fostering community engagement.",
          image:
            "https://www.biharsamajabudhabi.com/img/partners/partnership.png", // Cover image for Twitter
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
              "Bihar Samaj Abu Dhabi, Partners, Community Engagement, Cultural Unity, UAE, Support, Collaboration",
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
      <div className="partners-page">
        <div className="partners-hero">
          <Container>
            <h1 className="partners-hero__title">Our Valued Partners</h1>
            <p className="partners-hero__subtitle">
              Together, we're making a difference in Abu Dhabi and beyond.
            </p>
          </Container>
        </div>

        <Container>
          <Breadcrumb separator=">" className="partners-breadcrumb">
            <Breadcrumb.Item>
              <Link href="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Partners</Breadcrumb.Item>
          </Breadcrumb>

          <SectionTitle
            title="Meet Our Partners"
            className="partners-section-title"
          />

          <div className="partners-grid">
            {partners.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} />
            ))}
          </div>

          <section className="become-partner">
            <h2 className="become-partner__title">Become a Partner</h2>
            <p className="become-partner__description">
              Interested in partnering with Bihar Samaj Abu Dhabi? We're always
              looking for organizations and individuals who share our values and
              vision. Let's create something amazing together!
            </p>
            <Link
              href="/contact/contact-us/whats-on-your-mind/website-feedback-form"
              className="become-partner__cta-button"
            >
              Contact Us
            </Link>
          </section>
        </Container>
      </div>
    </LayoutOne>
  );
};

export default Partners;
