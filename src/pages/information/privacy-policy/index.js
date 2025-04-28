import { Breadcrumb, Row, Col, message } from "antd";
import { NextSeo } from "next-seo";
import React from "react";
import { LayoutOne, Container, SectionTitle } from "@components";
import Head from "next/head";
import { CopyOutlined } from "@ant-design/icons";

const PrivacyPolicy = () => {
  const privacyPolicySchema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Understand our commitment to privacy at Bihar Samaj Abu Dhabi. Read our policy on how we responsibly handle and secure your personal data.",
    url: "https://www.biharsamajabudhabi.com/information/privacy-policy",
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@biharsamajabudhabi.com");
    message.success("Email copied to clipboard!");
  };

  const handleCopyUsername = (username) => {
    navigator.clipboard.writeText(username);
    message.success(`Username "${username}" copied to clipboard!`);
  };

  return (
    <>
      <NextSeo
        title="Privacy Policy | Bihar Samaj Abu Dhabi - Protecting Your Data"
        description="Understand our commitment to privacy at Bihar Samaj Abu Dhabi. Read our policy on how we responsibly handle and secure your personal data."
        canonical="https://www.biharsamajabudhabi.com/information/privacy-policy"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/information/privacy-policy",
          title:
            "Privacy Policy | Bihar Samaj Abu Dhabi - Protecting Your Data",
          description:
            "Our privacy policy details our commitment to safeguarding your personal information and upholding your trust in our community.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/main.jpg",
              width: 800,
              height: 600,
              alt: "Blog | Bihar Samaj Abu Dhabi - Insights and Stories",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Privacy Policy | Bihar Samaj Abu Dhabi - Protecting Your Data",
          description:
            "Understand our commitment to privacy at Bihar Samaj Abu Dhabi. Read our policy on how we responsibly handle and secure your personal data.",
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
              "Privacy Policy, Data Protection, Personal Information Security, Bihar Samaj Abu Dhabi Privacy, User Data Safety, Online Privacy Practices, Community Data Handling, Secure Personal Data, Trust and Privacy",
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
          {JSON.stringify(privacyPolicySchema)}
        </script>
      </Head>

      <LayoutOne title="Privacy Policy">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
          </Breadcrumb>
          <SectionTitle title="Privacy Policy" className="-center" />
          <Row gutter={40} justify="center">
            <Col xs={24} sm={24}>
              <div className="privacyPolicyContent">
                <div className="title-container">
                  <h2>Commitment to Your Privacy</h2>
                </div>
                <p>
                  Welcome to the Bihar Samaj Abu Dhabi's privacy policy. This
                  policy serves as our commitment to your privacy, detailing how
                  we handle and protect your personal information. Your trust is
                  the cornerstone of our community, and safeguarding your data
                  is a responsibility we take seriously.
                </p>

                <h3>Information We Collect</h3>
                <p>
                  We may collect personal identification information from users
                  in various ways when they interact with our site and services.
                  This may include, but is not limited to, visits to our site,
                  registrations, subscriptions, and participation in surveys or
                  forms, where users may provide their name, email address,
                  mailing address, phone number, and photos for talent
                  registration.
                </p>

                <h3>Talent Registration and Photo Submission</h3>
                <p>
                  As part of the talent registration process, we may request
                  participants to submit photographs. These photographs are used
                  to identify individuals, promote events, and highlight
                  community talent on various platforms including social media,
                  newsletters, and our official website.
                </p>

                <h3>How We Use Your Information</h3>
                <p>
                  The information we collect may be used to personalize user
                  experience, improve our website, run promotions, process
                  transactions, and communicate with users via different
                  channels for customer service or updates, including the
                  promotion of talent and events.
                </p>

                <h3>Sharing Your Personal Information</h3>
                <p>
                  We respect your personal information and do not sell, trade,
                  or rent it to others. We may share aggregate, non-personally
                  identifiable information with partners or advertisers for the
                  purposes outlined above. Personal photos submitted for talent
                  registration are used responsibly and in accordance with the
                  consent provided during registration.
                </p>

                <h3>Social Media Collaborations and Presence</h3>
                <p>
                  Bihar Samaj Abu Dhabi maintains an active presence across
                  various social media platforms to better connect with our
                  community members and share important updates, events, and
                  cultural celebrations. We may collaborate with other
                  organizations, influencers, or community partners to amplify
                  our reach and impact through these channels.
                </p>

                <p>
                  Such collaborations are always conducted in accordance with
                  our community values and privacy standards. When engaging with
                  our social media content or participating in collaborative
                  activities, your interactions may be visible to our partners
                  and their audiences in accordance with each platform's privacy
                  settings.
                </p>

                <p>
                  You can connect with us on our official social media channels:
                </p>
                <ul className="social-media-list">
                  <li>
                    <div className="platform">
                      <strong>Instagram:</strong>{" "}
                      <a
                        href="https://www.instagram.com/biharsamajabudhabi_official"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">
                          @biharsamajabudhabi_official
                        </span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("@biharsamajabudhabi_official")
                      }
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>Facebook:</strong>{" "}
                      <a
                        href="https://www.facebook.com/BiharSamajAbuDhabiOfficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">
                          BiharSamajAbuDhabiOfficial
                        </span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("BiharSamajAbuDhabiOfficial")
                      }
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>Twitter:</strong>{" "}
                      <a
                        href="https://twitter.com/samaj_bihar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">@samaj_bihar</span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() => handleCopyUsername("@samaj_bihar")}
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href="https://www.linkedin.com/showcase/biharsamajabudhabiofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">
                          Bihar Samaj Abu Dhabi Official
                        </span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("Bihar Samaj Abu Dhabi Official")
                      }
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>Threads:</strong>{" "}
                      <a
                        href="https://www.threads.net/@biharsamajabudhabi_official"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">
                          @biharsamajabudhabi_official
                        </span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("@biharsamajabudhabi_official")
                      }
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>TikTok:</strong>{" "}
                      <a
                        href="https://www.tiktok.com/@biharsamajabudhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">@biharsamajabudhabi</span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() => handleCopyUsername("@biharsamajabudhabi")}
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>YouTube:</strong>{" "}
                      <a
                        href="https://www.youtube.com/@BiharSamajAbudhabiOffical"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">
                          Bihar Samaj Abudhabi Official
                        </span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("Bihar Samaj Abudhabi Official")
                      }
                    >
                      Copy
                    </button>
                  </li>
                  <li>
                    <div className="platform">
                      <strong>Google Business:</strong>{" "}
                      <a
                        href="https://g.co/kgs/Y96H7nw"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="username">Bihar Samaj Abu Dhabi</span>
                      </a>
                    </div>
                    <button
                      className="copy-username"
                      onClick={() =>
                        handleCopyUsername("Bihar Samaj Abu Dhabi")
                      }
                    >
                      Copy
                    </button>
                  </li>

                  <p className="hashtag-info">
                    When sharing your experiences with Bihar Samaj Abu Dhabi on
                    social media, we encourage you to use our official hashtag{" "}
                    <strong>#biharsamajabudhabi</strong>. This hashtag helps
                    connect our community members and makes it easier for others
                    to discover events, activities, and updates related to our
                    organization.
                  </p>

                  <div className="hashtag-highlight">
                    <p>
                      <span className="hashtag-symbol">#</span>
                      <span className="hashtag-text">biharsamajabudhabi</span>
                    </p>
                    <p className="hashtag-description">
                      Our official community hashtag
                    </p>
                  </div>
                </ul>

                <p>
                  We encourage you to engage with our content, share your
                  experiences, and participate in our online community
                  discussions. By engaging with our social media profiles, you
                  acknowledge that your interactions may be subject to the
                  respective platform's terms and privacy policies.
                </p>

                <h3>Security</h3>
                <p>
                  Adopting appropriate data management and security measures, we
                  strive to protect your personal information, including any
                  photographs, against unauthorized access or disclosure.
                </p>

                <h3>Your Data Rights</h3>
                <p>
                  You have the right to restrict the collection or use of your
                  personal information, including any photographs submitted. We
                  commit to not sharing your information without your consent,
                  except as outlined in this policy.
                </p>

                <h3>Bihar Samaj Admin Communication</h3>
                <p>
                  Bihar Samaj admin members will never ask for OTPs or other
                  sensitive information. We strongly advise you to remain
                  vigilant against such requests. All official emails will be
                  sent from the following domains and subdomains. Please save
                  these addresses to avoid missing important communications or
                  marking them as spam:
                </p>
                <ul>
                  <li>
                    <strong>email.biharsamajabudhabi.com</strong>
                  </li>
                  <li>
                    <strong>inbox.biharsamajabudhabi.com</strong>
                  </li>
                  <li>
                    <strong>biharsamajabudhabi.com</strong>
                  </li>
                </ul>

                <h3>Data Retention</h3>
                <p>
                  We retain personal data only as long as necessary for the
                  purposes outlined in this policy or as required by law. Users
                  can request deletion of their data, subject to applicable
                  legal requirements.
                </p>

                <h3>Cookies and Tracking</h3>
                <p>
                  Our website may use cookies to enhance user experience. Users
                  can manage cookie preferences in their browser settings. Some
                  features of the site may not function properly without
                  cookies.
                </p>

                <h3>Changes to This Privacy Policy</h3>
                <p>
                  We may update our privacy policy and will indicate any changes
                  on this page, encouraging users to review it periodically.
                </p>

                <h3>Contacting Us</h3>
                <p>
                  Should you have any inquiries regarding our privacy policy or
                  practices, please reach out to us at{" "}
                  <span className="trusted-email">
                    info@biharsamajabudhabi.com
                  </span>
                  .
                </p>

                <div className="email-notice">
                  <p>
                    <strong>Important:</strong> Please do not reply to emails
                    from subdomains. For any community-related inquiries, reply
                    only to{" "}
                    <span className="trusted-email" onClick={handleCopyEmail}>
                      info@biharsamajabudhabi.com{" "}
                      <CopyOutlined className="copy-icon" />
                    </span>
                    . Bihar Samaj admin may send emails from subdomains or the
                    root domain, but all replies should be directed to the above
                    email address.
                  </p>
                </div>

                <p className="last-updated">Last updated: 22nd Jan 2025</p>
              </div>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default React.memo(PrivacyPolicy);
