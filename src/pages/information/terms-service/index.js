import { Breadcrumb, Row, Col } from "antd";
import { NextSeo } from "next-seo";
import React from "react";
import { useCallback } from "react";

import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import SectionTitle from "../../../components/other/SectionTitle";

const TermsService = () => {
  const handlePrivacyPolicyClick = useCallback((event) => {
    event.preventDefault();
    const privacyPolicyUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/privacy-policy`;
    window.open(privacyPolicyUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <>
      <NextSeo
        title="Terms of Service | Bihar Samaj Abu Dhabi - Community Guidelines"
        description="Familiarize yourself with the Terms of Service of Bihar Samaj Abu Dhabi. These guidelines ensure a respectful and inclusive environment for all members of our community."
        canonical="https://www.biharsamajabudhabi.com/information/terms-service"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/information/terms-service",
          title:
            "Terms of Service | Bihar Samaj Abu Dhabi - Community Guidelines",
          description:
            "Familiarize yourself with the Terms of Service of Bihar Samaj Abu Dhabi. These guidelines ensure a respectful and inclusive environment for all members of our community.",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg",
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi Registration Banner",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Terms of Service | Bihar Samaj Abu Dhabi - Community Guidelines",
          description:
            "Familiarize yourself with the Terms of Service of Bihar Samaj Abu Dhabi. These guidelines ensure a respectful and inclusive environment for all members of our community.",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg", // Optional: Replace with a relevant image URL for Twitter card, if desired
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
              "Terms of Service, Community Guidelines, Bihar Samaj Abu Dhabi, Respectful Conduct, Inclusive Community, Membership Rules, Abu Dhabi Cultural Group, Community Ethics, Member Participation Terms",
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

      <LayoutOne title="Terms of Service">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Terms of Service</Breadcrumb.Item>
          </Breadcrumb>
          <SectionTitle title="Terms of Service" className="-center" />
          <Row gutter={40} justify="center">
            <Col xs={24} sm={24}>
              <div className="privacyPolicyContent">
                <div className="title-container">
                  <h2>Welcome to the Bihar Samaj Abu Dhabi Community</h2>
                </div>
                <p>
                  These terms and conditions are crafted with the spirit of our
                  community in mind and serve as a guide for our collective and
                  individual actions.
                </p>

                <h3>Acceptance of Terms</h3>
                <p>
                  By joining and using our community's services, you agree to
                  comply with these terms, which protect and enhance our
                  community environment.
                </p>

                <h3>Community Conduct</h3>
                <p>
                  We uphold a standard of conduct that promotes respect,
                  kindness, and constructive interactions for all our members.
                </p>

                <h3>Privacy and Personal Data</h3>
                <p>
                  The privacy of your data is not just a promise, it's a
                  principle. Please review our detailed&nbsp;
                  <a href="#" onClick={handlePrivacyPolicyClick}>
                    Privacy&nbsp;Policy
                  </a>
                  &nbsp;to understand how we handle your information.
                </p>

                <h3>Media Captures and Social Media Sharing</h3>
                <p>
                  By participating in Bihar Samaj Abu Dhabi events and
                  activities, you acknowledge and consent to the community's
                  administration capturing photographs and videos of members.
                  These media assets may be used for promotional purposes,
                  including but not limited to uploads on our social media
                  platforms such as Facebook, Instagram, Twitter, LinkedIn,
                  YouTube, Threads, Google Cards, and the website gallery page.
                  Such efforts aim to celebrate and share our community's
                  vibrant culture.
                </p>

                <h3>Social Media Collaborations</h3>
                <p>
                  Occasionally, Bihar Samaj's social media channels may engage
                  in collaborations with other organizations or influencers to
                  amplify our community's reach and impact. Members should feel
                  assured that these collaborations are conducted in a manner
                  that upholds our community's integrity and values.
                </p>

                <h3>Use of Services</h3>
                <p>
                  The services we provide are subject to change, with continuous
                  improvements and updates to serve you better.
                </p>

                <h3>Information Accuracy</h3>
                <p>
                  While we strive for accuracy, we remind you to cross-check the
                  information provided for your decision-making processes.
                </p>

                <h3>Third-Party Links</h3>
                <p>
                  Our community may reference external content, which we share
                  with the intent of enriching our community experience,
                  although we do not endorse all external content.
                </p>

                <h3>Feedback and Contributions</h3>
                <p>
                  Your insights and contributions are what make our community
                  dynamic and evolving. We welcome your feedback at all times.
                </p>

                <h3>Usage Guidelines</h3>
                <p>
                  We expect all members to use our services in a lawful,
                  respectful manner that does not infringe upon the rights of
                  others or the operational integrity of our community.
                </p>

                <p>
                  Your participation enriches us all. If you have any questions
                  or need clarification on any of the terms, please contact us.
                  Together, we create a home away from home here at Bihar Samaj
                  Abu Dhabi. ✔
                </p>

                <div className="button-container">
                  <button
                    className="know-more-btn"
                    onClick={handlePrivacyPolicyClick}
                  >
                    Learn More About Privacy Policy
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default React.memo(TermsService);
