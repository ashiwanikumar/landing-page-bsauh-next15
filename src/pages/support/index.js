import React from "react";
import { Button, Breadcrumb, Row, Col, Card, Typography, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import { NextSeo } from "next-seo";

const { Title, Text } = Typography;

const SupportPage = () => {
  return (
    <>
      <NextSeo
        title="Support Services - Bihar Samaj Abu Dhabi (UAE)"
        description="Access a wide range of support services for our community members. From payment issues to general inquiries, we're here to assist you."
        canonical="https://www.biharsamajabudhabi.com/support"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/support",
          title: "Support Services - Bihar Samaj Abu Dhabi (UAE)",
          description:
            "Access a wide range of support services for our community members. From payment issues to general inquiries, we're here to assist you.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/support/support.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Support Services Banner",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Support Services - Bihar Samaj Abu Dhabi (UAE)",
          description:
            "Access a wide range of support services for our community members. From payment issues to general inquiries, we're here to assist you.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/support/support.png",
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
              "Bihar Samaj Abu Dhabi, Support Services, Payment Support, Event Registration, Membership Assistance, Donation Support, Indian Community in UAE, Cultural Organization in Abu Dhabi",
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

      <LayoutOne title="Support Services - Bihar Samaj Abu Dhabi (UAE)">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Support</Breadcrumb.Item>
            <Breadcrumb.Item>Help</Breadcrumb.Item>
          </Breadcrumb>

          <div className="member-card-title">
            Support Services at Bihar Samaj Abu Dhabi
          </div>

          <Row justify="center">
            <Col xs={24} sm={24} md={24}>
              <p className="community-info">
                Whether you're facing payment issues or need assistance with any
                other service, our dedicated support team is here to help.
                Discover our support services and get the help you need.
              </p>

              <Card className="common-card-shadow">
                <div style={{ textAlign: "center" }}>
                  <Title level={2}>Common Issues and Support Services</Title>
                </div>
                <List
                  dataSource={[
                    "Event registration payment problems",
                    "Membership fee payment issues",
                    "Refund or transaction inquiries",
                    "General inquiries and support requests",
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        alignItems: "left !important ",
                        justifyContent: "left",
                      }}
                    >
                      <CheckCircleOutlined
                        style={{ marginRight: "8px", color: "#52c41a" }}
                      />
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
              </Card>

              <Card className="access-card-shadow">
                <div style={{ textAlign: "center" }}>
                  <Title level={2}>How to Access Support Services</Title>
                </div>
                <List
                  dataSource={[
                    "Identify the specific issue or service you need help with.",
                    "Gather all necessary information and documents related to your query.",
                    "Contact us through the provided support channels for assistance.",
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        alignItems: "left !important ",
                        justifyContent: "left",
                      }}
                    >
                      <CheckCircleOutlined
                        style={{ marginRight: "8px", color: "#52c41a" }}
                      />
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    type="primary"
                    href="/support/payment-help"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Access Support Services
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default SupportPage;
