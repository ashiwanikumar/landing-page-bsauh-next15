import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  message,
  notification,
  Modal,
} from "antd";
import { NextSeo } from "next-seo";
import Container from "../../../../../components/other/Container";
import LayoutOne from "../../../../../components/layout/LayoutOne";
import SectionTitle from "../../../../../components/other/SectionTitle";
import TestimonialArea from "../../../../../components/Home/TestimonialArea";
import {
  sendFeedbackOtp,
  verifyFeedbackOTP,
  saveFeedback,
} from "../../../../../apis/websiteFeedback";

const WebsiteFeedbackForm = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otpId, setOtpId] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ** Handle send otp
  const handleSendFeedbackOtp = async () => {
    setIsSendingOtp(true);

    const email = form.getFieldValue("email");

    if (email) {
      try {
        await sendFeedbackOtp(email);
        setOtpSent(true);
        notification.success({
          message: "OTP Sent",
          description:
            "An OTP has been sent to your email. Please check your inbox.",
        });
      } catch (error) {
        console.error("Error sending OTP: ", error);
        notification.error({
          message: "Error Sending OTP",
          description: "Failed to send OTP. Please try again.",
        });
      }
    } else {
      message.warning("Please enter your email first.");
    }
    setIsSendingOtp(false);
  };

  // ** Handle verify otp
  const handleVerifyFeedbackOtp = async () => {
    const email = form.getFieldValue("email");
    const otp = form.getFieldValue("otp");

    try {
      await verifyFeedbackOTP({ email, otp }).then((res) => {
        setOtpId(res.data.otpId);
        setOtpVerified(true);
        notification.success({
          message: "Verification Success",
          description: "The OTP has been successfully verified.",
        });
      });
    } catch (error) {
      console.error("Error verifying OTP: ", error);
      notification.error({
        message: "Verification Failed",
        description: "The entered OTP is incorrect. Please try again.",
      });
    }
  };

  // ** Handle feedback submit
  const handleFeedbackSubmit = async (values) => {
    // If not consented show error message
    if (!values.dataProcessingConsent) {
      message.error("Please agree to the consent.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Corrected data preparation
      const submissionData = {
        ...values,
        otpId: otpId,
        otp: otpId,
      };

      // Correct API call
      await saveFeedback(submissionData);

      showModal();
      form.resetFields();
      setOtpSent(false);
      setOtpVerified(false);
      setOtpId("");
      setHasConsented(false);
    } catch (error) {
      console.error("Failed to submit feedback: ", error);
      message.error("Failed to submit feedback.");
    }
    setIsSubmitting(false);
  };

  const handleOtpSentClick = () => {
    setOtpSent(true);
  };

  return (
    <>
      <NextSeo
        title="Website Feedback | Bihar Samaj Abu Dhabi"
        description="Share your experience with biharsamajabudhabi.com. We welcome your suggestions, comments, and opinions to continuously improve and tailor our site to your needs. Let us know how we can make your visit more enriching and memorable."
        canonical="https://www.biharsamajabudhabi.com/information/contact-us/whats-on-your-mind/website-feedback-form"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/information/contact-us/whats-on-your-mind/website-feedback-form",
          title: "Website Feedback | Bihar Samaj Abu Dhabi",
          description:
            "Share your experience with biharsamajabudhabi.com. We welcome your suggestions, comments, and opinions to continuously improve and tailor our site to your needs. Let us know how we can make your visit more enriching and memorable.",
          site_name: "Bihar Samaj Abu Dhabi",
          type: "website",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/websitefeedback.png",
              width: 800,
              height: 600,
              alt: "Share your feedback with Bihar Samaj Abu Dhabi",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Website Feedback | Bihar Samaj Abu Dhabi",
          description:
            "Share your experience with biharsamajabudhabi.com. We welcome your suggestions, comments, and opinions to continuously improve and tailor our site to your needs. Let us know how we can make your visit more enriching and memorable.",
          image: "https://www.biharsamajabudhabi.com/websitefeedback.png",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://www.biharsamajabudhabi.com/img/icon/favicon/favicon.ico",
          },
          {
            rel: "icon",
            href: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-blogs-bucket/fav.png",
            sizes: "32x32",
          },
          {
            rel: "me",
            href: "https://www.facebook.com/BiharSamajAbuDhabiOfficial/",
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
              "Bihar Samaj Abu Dhabi, Website Feedback, Community Feedback, User Experience, Website Improvement, Cultural Community UAE, Feedback Form, Community Engagement",
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

      <LayoutOne title="Website Feedback">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home"></i> Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Website Feedback</Breadcrumb.Item>
          </Breadcrumb>
          <SectionTitle
            title="We'd love to hear from you!"
            className="-center"
          />
          <Card className="form-text-card">
            <p className="feedback-invitation-message">
              Share your experience with biharsamajabudhabi.com. We welcome your
              suggestions, comments, and opinions to continuously improve and
              tailor our site to your needs. Let us know how we can make your
              visit more enriching and memorable.
            </p>
          </Card>
          <Card className="form-box-card">
            <Form
              form={form}
              name="website_feedback"
              onFinish={handleFeedbackSubmit}
              className="website-feedback-form"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "First name is required" },
                      {
                        pattern: /^[A-Za-z]+$/,
                        message: "Please enter only alphabets",
                      },
                      {
                        max: 15,
                        message:
                          "First name cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="First Name"
                      maxLength={15}
                      onInput={(e) => {
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
                        pattern: /^[A-Za-z]+$/,
                        message: "Please enter only alphabets",
                      },
                      {
                        max: 15,
                        message:
                          "Last name cannot be longer than 15 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Last Name"
                      maxLength={15}
                      onInput={(e) => {
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
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email" name="email" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="otp"
                    shouldUpdate
                    rules={[
                      {
                        required: otpSent,
                        message: "OTP is required",
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: "OTP must be a 6-digit number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter OTP"
                      maxLength={6}
                      disabled={!otpSent}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  </Form.Item>

                  <Form.Item noStyle shouldUpdate>
                    {() => {
                      const otpSentVal = otpSent;
                      const otpVerifiedVal = otpVerified;
                      return (
                        <>
                          {!otpSentVal && !otpVerifiedVal && (
                            <Button
                              type="link"
                              onClick={handleOtpSentClick}
                              style={{
                                padding: 0,
                                height: "auto",
                                fontSize: "12px",
                              }}
                            >
                              If you have an OTP, click here
                            </Button>
                          )}
                        </>
                      );
                    }}
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={handleSendFeedbackOtp}
                    disabled={otpSent || otpVerified || isSendingOtp}
                    loading={isSendingOtp}
                  >
                    Send OTP
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleVerifyFeedbackOtp}
                    disabled={!otpSent || otpVerified}
                    style={{ marginLeft: "8px" }}
                  >
                    Verify
                  </Button>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="message"
                    rules={[
                      { required: otpVerified, message: "Message is required" },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="We're eager to hear your thoughts on how we can further enrich our cultural celebrations, support services, and overall community experience."
                      maxLength={1500}
                      showCount
                      disabled={!otpVerified}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="subscribeNewsletter" valuePropName="checked">
                <Checkbox>I want to join the newsletter.</Checkbox>
              </Form.Item>

              <Form.Item
                name="dataProcessingConsent"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "You must consent to the processing of your personal data to proceed."
                            )
                          ),
                  },
                ]}
              >
                <Checkbox>
                  I consent to the processing of my personal data entered above
                  for the purpose of recording the feedback.
                </Checkbox>
              </Form.Item>

              <p>
                For further details on how your personal data will be processed
                and how your consent can be managed, refer to the{" "}
                <a
                  href="https://www.biharsamajabudhabi.com/information/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BSAD Privacy Notice
                </a>
                .
              </p>

              <Form.Item className="form-submit-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!otpVerified || isSubmitting}
                  loading={isSubmitting}
                >
                  Submit Feedback
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Container>
        {/* Testimonial Area Preview */}
        <TestimonialArea />
      </LayoutOne>

      {isModalVisible && (
        <Modal
          title="Submission Successful"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div
              style={{
                padding: "15px",
              }}
            >
              <Button key="submit" type="primary" onClick={handleOk}>
                OK
              </Button>
              ,
            </div>,
          ]}
        >
          <p
            style={{
              padding: "15px",
            }}
          >
            Your feedback has been submitted successfully!
          </p>
        </Modal>
      )}
    </>
  );
};

export default React.memo(WebsiteFeedbackForm);
