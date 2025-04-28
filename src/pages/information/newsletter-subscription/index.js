import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  notification,
} from "antd";
import { NextSeo } from "next-seo";
import Container from "../../../components/other/Container";
import LayoutOne from "../../../components/layout/LayoutOne";
import Head from "next/head";
import SectionTitle from "../../../components/other/SectionTitle";
import TestimonialArea from "../../../components/Home/TestimonialArea";

import {
  subscribeNewsletter,
  sendNewsletterOtp,
  verifyNewsletterOtp,
} from "../../../apis/newsletter";

const NewsletterSubscriptionForm = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Inside your component after the `useState` declarations
  useEffect(() => {
    let timer;
    if (isModalVisible) {
      timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 10000); // Automatically close the modal after 10 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or the modal is closed manually
  }, [isModalVisible]);

  // Define the onOtpChange function here
  const onOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendNewsletterOtp = async () => {
    setIsLoading(true);
    const email = form.getFieldValue("email");
    if (email) {
      try {
        setIsSendingOtp(true);

        await sendNewsletterOtp(email)
          .then(() => {
            setIsSendingOtp(false);
            setOtpSent(true);

            notification.success({
              message: "OTP Sent",
              description:
                "An OTP has been sent to your email. Please check your inbox.",
            });
          })
          .catch((err) => {
            setIsSendingOtp(false);
            console.log("ERROR SENDING OTP", err);
          });
      } catch (error) {
        console.error("Error sending OTP: ", error);
        setIsSendingOtp(false);

        notification.error({
          message: "Error Sending OTP",
          description: "Failed to send OTP. Please try again.",
        });
      }
    } else {
      notification.warning({ message: "Please enter your email first." });
    }
    setIsLoading(false);
  };

  const verifyOtpAndSubscribe = async () => {
    setIsLoading(true);
    const email = form.getFieldValue("email");
    const firstName = form.getFieldValue("firstName");
    const lastName = form.getFieldValue("lastName");

    try {
      setIsVerifyingOtp(true);

      await verifyNewsletterOtp({ email, otp })
        .then(async (res) => {
          setIsVerifyingOtp(false);

          setOtpVerified(true);

          // Set is subscribing to true
          setIsSubscribing(true);

          const browser = navigator.userAgent;
          const location = Intl.DateTimeFormat().resolvedOptions().timeZone;

          await subscribeNewsletter({
            email,
            firstName,
            lastName,
            browser,
            location,
            otpId: res.data.otpId,
          })
            .then(() => {
              setIsSubscribing(false);

              form.resetFields();

              notification.success({
                message: "Subscription Successful",
                description:
                  "You've successfully subscribed to the newsletter.",
              });
              setIsModalVisible(true);
            })
            .catch((er) => {
              setIsSubscribing(false);

              console.log("ERROR SUBSCRIBING", er);
            });
        })
        .catch((err) => {
          setIsVerifyingOtp(false);

          console.log("ERROR SENDING OTP", err);
        });
    } catch (error) {
      console.error("Error during the process: ", error);
      notification.error({
        message: "Process Failed",
        description: "Please check your OTP or try again later.",
      });
    }
    setIsLoading(false);
  };

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
      {(isSendingOtp || isVerifyingOtp || isSubscribing) && (
        <div className="fullscreen-loader">
          <div className="loader-spinner"></div>
        </div>
      )}

      <NextSeo
        title="Subscribe to Bihar Samaj Abu Dhabi Newsletter"
        description="Join our newsletter to stay updated on the latest events, news, and activities of Bihar Samaj Abu Dhabi. Subscribe now to connect with the community and never miss an update."
        canonical="https://www.biharsamajabudhabi.com/information/newsletter-subscription"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/information/newsletter-subscription",
          title: "Subscribe to Bihar Samaj Abu Dhabi Newsletter",
          description:
            "Join our newsletter to stay updated on the latest events, news, and activities of Bihar Samaj Abu Dhabi. Subscribe now to connect with the community and never miss an update.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/websitenewsletter/newsletter.png",
              width: 800,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi Newsletter Subscription Banner",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Subscribe to Bihar Samaj Abu Dhabi Newsletter",
          description:
            "Join our newsletter to stay updated on the latest events, news, and activities of Bihar Samaj Abu Dhabi. Subscribe now to connect with the community and never miss an update.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/websitenewsletter/newsletter.png",
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
              "Bihar Samaj Abu Dhabi, Newsletter Subscription, Community Updates, Indian Community in UAE, Cultural Community News, Bihar Culture in Abu Dhabi, Community Newsletter",
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

      <LayoutOne title="Newsletter Subscription">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home"></i> Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Newsletter Subscription</Breadcrumb.Item>
          </Breadcrumb>
          <SectionTitle
            title="Subscribe to Our Newsletter"
            className="-center"
          />
          <Card className="newsletter-text-card">
            <p className="feedback-invitation-message">
              Stay updated with the latest events, blogs, and community news
              from Bihar Samaj Abu Dhabi. Subscribe to our newsletter for
              enriching insights and updates directly to your inbox.
            </p>
          </Card>
          <Card className="newsletter-box-card">
            <Form form={form} className="newsletter-page-newsletter">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is required" },
                      {
                        // This rule ensures only alphabet characters are allowed.
                        pattern: /^[A-Za-z]+$/,
                        message: "Please enter only alphabets",
                      },
                      {
                        // This rule ensures the input does not exceed 15 characters.
                        max: 15,
                        message:
                          "First name cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="First Name"
                      maxLength={15} // Enforces a hard limit on character count
                      onInput={(e) => {
                        // Removes any non-alphabet characters in real-time
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z]/g,
                          ""
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      { required: true, message: "Last name is required" },
                      {
                        // Enforces the input of alphabet characters only.
                        pattern: /^[A-Za-z]+$/,
                        message: "Please enter only alphabets",
                      },
                      {
                        // Ensures the input does not exceed 15 characters.
                        max: 15,
                        message:
                          "Last name cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Last Name"
                      maxLength={15} // Enforces a hard limit on character count.
                      onInput={(e) => {
                        // Removes any non-alphabet characters in real-time.
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z]/g,
                          ""
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6}>
                  <Button
                    block // Makes the button full-width on all screen sizes; remove if you want it only on small screens
                    type="primary"
                    onClick={handleSendNewsletterOtp}
                    disabled={otpSent || otpVerified || isSendingOtp}
                    loading={isSendingOtp}
                  >
                    Send OTP
                  </Button>
                </Col>
                <Col span={3.2}>
                  <Form.Item
                    name="otp"
                    rules={[
                      { required: otpSent, message: "OTP is required" },
                      {
                        pattern: /^\d{6}$/,
                        message: "OTP must be a 6-digit number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter OTP"
                      onChange={onOtpChange}
                      maxLength={6}
                      disabled={!otpSent}
                      onInput={(e) => {
                        // Replace any non-digit characters with an empty string
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="submit-button-container">
                <Button
                  type="primary"
                  onClick={verifyOtpAndSubscribe}
                  disabled={!otpSent || otpVerified || isLoading}
                >
                  Confirm & Subscribe
                </Button>
              </div>
            </Form>
          </Card>
        </Container>
        {/* Testimonial Area Preview */}
        <TestimonialArea />
      </LayoutOne>

      {isModalVisible && (
        <div
          className="newsletter-custom-modal-overlay"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <div className="custom-modal-newsletter">
            <h2>Subscription Successful</h2>
            <p>
              Your subscription to the Bihar Samaj Abu Dhabi newsletter has been
              confirmed. Welcome aboard!
            </p>
            <Button
              className="close-button-newsletter"
              onClick={() => setIsModalVisible(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(NewsletterSubscriptionForm);
