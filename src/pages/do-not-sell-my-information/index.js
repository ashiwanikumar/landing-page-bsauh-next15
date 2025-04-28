import React from "react";
import { NextSeo } from "next-seo";
import { Breadcrumb, Button, Row, Col, Typography, Space } from "antd";
import { ShieldCheck, Info, ArrowRight } from "lucide-react";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import { Helmet } from "react-helmet";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

function DonotSell() {
  // JSON-LD structured data for SEO enhancement
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Do Not Sell My Personal Information",
    url: "https://www.biharsamajabudhabi.com/do-not-sell-my-information",
    description:
      "Understand and exercise your privacy rights with Bihar Samaj Abu Dhabi. Learn how we protect your personal information and how you can opt-out of data sharing.",
    publisher: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
      },
    },
    sameAs: [
      "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
      "https://www.instagram.com/biharsamajabudhabi_official",
      "https://twitter.com/samaj_bihar",
      "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
      "https://www.threads.net/@biharsamajabudhabi_official",
      "https://www.tiktok.com/@biharsamajabudhabi",
      "https://www.youtube.com/@BiharSamajAbudhabiOffical",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@biharsamajabudhabi.com",
      contactType: "customer service",
      areaServed: "AE",
      availableLanguage: "English",
    },
  };

  return (
    <>
      <NextSeo
        title="Do Not Sell My Personal Information | Bihar Samaj Abu Dhabi"
        description="Understand and exercise your privacy rights with Bihar Samaj Abu Dhabi. Learn how we protect your personal information and how you can opt-out of data sharing."
        canonical="https://www.biharsamajabudhabi.com/do-not-sell-my-information"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/do-not-sell-my-information",
          title: "Do Not Sell My Personal Information | Bihar Samaj Abu Dhabi",
          description:
            "Bihar Samaj Abu Dhabi respects your privacy. Learn about your data rights and how to manage your personal information with us.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/about-us/do-not-sell.png",
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi - Privacy Rights",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Do Not Sell My Personal Information | Bihar Samaj Abu Dhabi",
          description:
            "Bihar Samaj Abu Dhabi respects your privacy. Learn about your data rights and how to manage your personal information with us.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/about-us/do-not-sell.png",
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
              "Privacy Rights, Data Control, Bihar Samaj Abu Dhabi, Opt-Out Information Sharing, UAE Privacy Law Compliance",
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

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <LayoutOne title="Do Not Sell My Personal Information">
        <div className="bsad-do-not-sell">
          <Container>
            <Breadcrumb separator=">" className="bsad-do-not-sell__breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                Do Not Sell My Personal Information
              </Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div className="bsad-do-not-sell__content">
                  <Title level={1}>
                    <ShieldCheck size={32} className="bsad-do-not-sell__icon" />
                    Protect Your Personal Information
                  </Title>
                  <Paragraph>
                    At Bihar Samaj Abu Dhabi, we prioritize your privacy rights.
                    Learn how we safeguard your personal information and
                    exercise control over your data.
                  </Paragraph>
                  <Space direction="vertical" size="large">
                    <div className="bsad-do-not-sell__feature">
                      <Title level={4}>
                        <Info size={24} className="bsad-do-not-sell__icon" />
                        Transparent Data Practices
                      </Title>
                      <Text>
                        Our policies clearly outline how we handle your
                        information.
                      </Text>
                    </div>
                    <div className="bsad-do-not-sell__feature">
                      <Title level={4}>
                        <Info size={24} className="bsad-do-not-sell__icon" />
                        Opt-Out Options
                      </Title>
                      <Text>
                        You have the right to opt-out of the sale of your
                        personal information.
                      </Text>
                    </div>
                    <div className="bsad-do-not-sell__feature">
                      <Title level={4}>
                        <Info size={24} className="bsad-do-not-sell__icon" />
                        Data Subject Rights
                      </Title>
                      <Text>
                        Access and control over your personal information are
                        just a request away.
                      </Text>
                    </div>
                  </Space>
                  <Link
                    href="/information/privacy-policy"
                    className="bsad-do-not-sell__cta"
                  >
                    <Button type="primary" size="large">
                      Learn More About Your Rights <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="bsad-do-not-sell__image">
                  <img
                    src="/assets/images/about-us/do-not-sell.png"
                    alt="Privacy and Protection"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default React.memo(DonotSell);
