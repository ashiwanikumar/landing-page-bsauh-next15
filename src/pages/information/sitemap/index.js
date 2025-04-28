import React from "react";
import { Breadcrumb, Typography, Row, Col } from "antd";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { FolderTree, ExternalLink } from "lucide-react";
import Container from "../../../components/other/Container";
import LayoutOne from "../../../components/layout/LayoutOne";
import TestimonialArea from "../../../components/Home/TestimonialArea";

const { Title, Text } = Typography;

const Sitemap = () => {
  const sitemapData = [
    {
      title: "Quick Links",
      links: [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/about/about-us" },
        { title: "Community", href: "/community" },
        {
          title: "Facebook Posts",
          href: "/resources/social-media/facebook-posts",
        },
        {
          title: "Instagram Posts",
          href: "/resources/social-media/instagram-posts",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Our Blog", href: "/blog" },
        { title: "Gallery", href: "/resources/gallery" },
        { title: "Events", href: "/events" },
        { title: "Social Media", href: "/resources/social-media" },
        { title: "Cancel Registration", href: "/events/cancel-registration" },
      ],
    },
    {
      title: "Information",
      links: [
        { title: "Join Us", href: "/information/registration" },
        {
          title: "Talent Registration",
          href: "/community/talent-registration",
        },
        { title: "Privacy Policy", href: "/information/privacy-policy" },
        { title: "Terms of Service", href: "/information/terms-service" },
        {
          title: "Website Feedback",
          href: "/information/contact-us/whats-on-your-mind/website-feedback-form",
        },
        { title: "Sitemap", href: "/information/sitemap" },
      ],
    },
  ];

  return (
    <>
      <NextSeo
        title="Sitemap | Bihar Samaj Abu Dhabi"
        description="Navigate through the comprehensive sitemap of Bihar Samaj Abu Dhabi's website to find the pages and resources you need."
        canonical="https://www.biharsamajabudhabi.com/information/sitemap"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/information/sitemap",
          title: "Sitemap | Bihar Samaj Abu Dhabi",
          description:
            "Explore our sitemap to find exactly what you're looking for in the Bihar Samaj Abu Dhabi website.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/sitemap.jpg",
              width: 800,
              height: 600,
              alt: "Sitemap | Bihar Samaj Abu Dhabi - Quick Navigation",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Sitemap | Bihar Samaj Abu Dhabi",
          description:
            "Discover all the pages on our site with the official Bihar Samaj Abu Dhabi sitemap.",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/sitemap.jpg",
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
              "Sitemap, Bihar Samaj Abu Dhabi Navigation, Website Map, Page Directory, Site Structure",
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
      <LayoutOne title="Sitemap">
        <div className="bsad-sitemap">
          <Container>
            <Breadcrumb separator=">" className="bsad-sitemap__breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Sitemap</Breadcrumb.Item>
            </Breadcrumb>

            <div className="bsad-sitemap__header">
              <FolderTree size={48} className="bsad-sitemap__icon" />
              <Title level={1}>Sitemap</Title>
              <Text>
                Explore our website structure and find what you're looking for
              </Text>
            </div>

            <Row gutter={[32, 32]} className="bsad-sitemap__content">
              {sitemapData.map((section, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <div className="bsad-sitemap__section">
                    <Title level={3}>{section.title}</Title>
                    <ul>
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.href} className="bsad-sitemap__link">
                            <ExternalLink size={16} />
                            <span>{link.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <TestimonialArea />
      </LayoutOne>
    </>
  );
};

export default React.memo(Sitemap);
