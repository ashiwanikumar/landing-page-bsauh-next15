import React from "react";
import { NextSeo } from "next-seo";
import LayoutOne from "../../components/layout/LayoutOne";
import UnsubscribeEmail from "../../components/Elements/UnsubscribeEmail/UnsubscribeEmail";
import Container from "../../components/other/Container";
import { Row, Col, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";

const EmailUnsubscribe = () => {
  const pageSchema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Email Unsubscribe",
    description:
      "Manage your email preferences and unsubscribe settings for Bihar Samaj Abu Dhabi communications.",
    url: "https://www.biharsamajabudhabi.com/email/unsubscribe",
    publisher: {
      "@type": "Organization",
      name: "Bihar Samaj Abu Dhabi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.biharsamajabudhabi.com/assets/images/logo.png",
      },
    },
  };

  return (
    <>
      <NextSeo
        title="Email Unsubscribe - Bihar Samaj Abu Dhabi"
        description="Manage your email preferences and unsubscribe settings for Bihar Samaj Abu Dhabi communications."
        canonical="https://www.biharsamajabudhabi.com/email/unsubscribe"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/email/unsubscribe",
          title: "Email Unsubscribe - Bihar Samaj Abu Dhabi",
          description:
            "Manage your email preferences and unsubscribe settings for Bihar Samaj Abu Dhabi communications.",
          site_name: "Bihar Samaj Abu Dhabi",
          type: "website",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/unsubscribe/unsubscribe.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Email Unsubscribe",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Email Preferences Management - Bihar Samaj Abu Dhabi",
          description:
            "Update your email preferences and communication settings for Bihar Samaj Abu Dhabi. Manage your subscriptions easily and stay in control of your inbox.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/unsubscribe/unsubscribe.png",
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <LayoutOne>
        <div className="unsubscribe-page">
          <div className="unsubscribe-hero">
            <Container>
              <Row justify="center" align="middle" className="hero-content">
                <Col xs={24} className="text-center">
                  <MailOutlined className="hero-icon" />
                  <h1>Email Preferences</h1>
                  <p>
                    Manage your communication settings with Bihar Samaj Abu
                    Dhabi
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <Container className="unsubscribe-container">
            <Row
              justify="center"
              style={{
                marginTop: "120px !important",
              }}
            >
              <Col xs={24} sm={20} md={16} lg={12}>
                <Card className="unsubscribe-card">
                  <div className="card-content">
                    <UnsubscribeEmail />
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
};

export default EmailUnsubscribe;
