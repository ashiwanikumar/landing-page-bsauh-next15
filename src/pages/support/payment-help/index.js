import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Breadcrumb,
  message,
  Select,
  Row,
  Col,
  Card,
  Divider,
  Upload,
} from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import { NextSeo } from "next-seo";

const SupportRequestForm = () => {
  const [form] = Form.useForm();
  const captchaRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const isEditMode = Object.keys(formData).length > 0;
  const { Option } = Select;

  // Function to handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log("Support request data:", values);
      setIsModalVisible(true);
      message.success("Support request submitted successfully!");
    } catch (error) {
      message.error(`Support request failed: ${error.message}`);
    }
    setLoading(false);
  };

  // Function to handle modal actions
  const handleModalOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Function to handle attachment upload
  const handleUploadAttachment = (options) => {
    const { onSuccess, onError, file } = options;
    console.log("Attachment uploaded:", file);
    onSuccess({ data: { url: "https://example.com/attachment.pdf" } });
    setAttachmentUrl("https://example.com/attachment.pdf");
  };

  // Function to handle reCAPTCHA changes
  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  return (
    <>
      <NextSeo
        title="Get Support from Bihar Samaj Abu Dhabi (UAE)"
        description="Have a question or need assistance? Our admin team is here to help. Submit your request and we'll get back to you as soon as possible."
        canonical="https://www.biharsamajabudhabi.com/support/payment-help"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/support/payment-help",
          title: "Get Support from Bihar Samaj Abu Dhabi (UAE)",
          description:
            "Have a question or need assistance? Our admin team is here to help. Submit your request and we'll get back to you as soon as possible.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/support/support.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Support Request Banner",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Get Support from Bihar Samaj Abu Dhabi (UAE)",
          description:
            "Have a question or need assistance? Our admin team is here to help. Submit your request and we'll get back to you as soon as possible.",
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
              "Bihar Samaj Abu Dhabi, Community Support, Help Desk, Contact Us, Feedback, Queries, Assistance, Customer Service, Indian Community in UAE, Cultural Organization in Abu Dhabi",
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

      <LayoutOne title="Support Request">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Support Request</Breadcrumb.Item>
          </Breadcrumb>

          <div className="member-card-title">
            Get Support from Bihar Samaj Abu Dhabi
          </div>

          <Row justify="center">
            <Col xs={24} sm={18} md={18}>
              <p className="community-info">
                Reach out to our dedicated support team for any questions,
                feedback, or assistance you may need. We're here to ensure your
                experience with Bihar Samaj Abu Dhabi is seamless and
                fulfilling.
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="support-request-form"
              >
                <Divider orientation="left">Support Request Form</Divider>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fullName"
                      label="Full Name"
                      rules={[{ required: true }]}
                    >
                      <Input
                        placeholder="Enter your full name"
                        disabled={isEditMode}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email address!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email address!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="example@mail.com"
                        disabled={isEditMode}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="issueType"
                  label="Select Issue Type"
                  rules={[
                    { required: true, message: "Please select an issue type!" },
                  ]}
                >
                  <Select onChange={setSelectedType}>
                    <Option value="Event">Event Registration Payment</Option>
                    {/* Add more options here as needed */}
                  </Select>
                </Form.Item>

                {selectedType === "Event" && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="verificationNumber"
                        label="Event Registration Number"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Event Registration Number!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter your Event Registration Number" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter the subject of your request" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Please provide details about your request"
                    maxLength={300}
                    showCount
                  />
                </Form.Item>

                <Form.Item name="attachment" label="Attachment (Optional)">
                  <Upload
                    name="attachment"
                    customRequest={handleUploadAttachment}
                    showUploadList={false}
                  >
                    <Button>Upload Attachment</Button>
                  </Upload>
                  {attachmentUrl && (
                    <div>
                      <a href={attachmentUrl} target="_blank" rel="noreferrer">
                        Uploaded Attachment
                      </a>
                    </div>
                  )}
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!recaptchaVerified}
                  >
                    Submit Request
                  </Button>
                </Form.Item>

                {loading && (
                  <div className="loading-overlay-support">
                    <div className="loading-spinner-support"></div>
                  </div>
                )}

                <Modal
                  title="Support Request Submitted"
                  visible={isModalVisible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                  footer={[
                    <Button key="back" onClick={handleModalCancel}>
                      Close
                    </Button>,
                  ]}
                >
                  <p>
                    Your support request has been submitted successfully. We
                    will get back to you as soon as possible.
                  </p>
                </Modal>
              </Form>
            </Col>
          </Row>
        </Container>
      </LayoutOne>
    </>
  );
};

export default SupportRequestForm;
