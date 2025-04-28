import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Breadcrumb,
  Modal,
  message,
} from "antd";
import { NextSeo } from "next-seo";
import LayoutOne from "../../../components/layout/LayoutOne";
import Container from "../../../components/other/Container";
import SectionTitle from "../../../components/other/SectionTitle";
import { eventCancellation } from "../../../apis/eventRegister";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TestimonialArea from "../../../components/Home/TestimonialArea";

const CancelRegistration = () => {
  const [formData, setFormData] = useState({
    email: "",
    verificationNumber: "",
    eventId: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  // Common onChange handler for all input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check if all fields are filled to enable the submit button
    const { email, verificationNumber, eventId } = formData;
    setIsFormValid(
      email !== "" &&
        verificationNumber !== "" &&
        eventId !== "" &&
        /^[a-f\d]{24}$/i.test(eventId) // Validates if eventId is a valid MongoDB ObjectId
    );
  }, [formData]);

  const performCancellation = async () => {
    // Destructure formData for ease of use
    const { eventId, email, verificationNumber } = formData;
    try {
      await eventCancellation(eventId, email, verificationNumber);
      message.success(
        "Your cancellation request has been successfully submitted. Please check your inbox."
      );
      // Reset the cancellation form fields and close the modal
      setFormData({ email: "", verificationNumber: "", eventId: "" });
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "An error occurred during cancellation."
      );
    }
  };
  const showConfirmationModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <NextSeo
        title="Registration Cancel | Bihar Samaj Abu Dhabi - Cancel Event Registration"
        description="Cancel your event registration quickly and easily with our simple form."
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/events/cancel-registration",
          title:
            "Registration Cancel | Bihar Samaj Abu Dhabi - Cancel Event Registration",
          description:
            "Need to cancel your event registration? With Bihar Samaj Abu Dhabi, you're part of a community that values cultural harmony and unity. Use this form to proceed with your cancellation.",
          images: [
            {
              url: "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/cancel.jpg",
              width: 800,
              height: 600,
              alt: "Registration Cancel | Bihar Samaj Abu Dhabi - Cancel Event Registration",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Registration Cancel | Bihar Samaj Abu Dhabi - Cancel Event Registration",
          description:
            "Bridging Cultures, Building Community. As part of our commitment to cultural unity, we understand plans change. Cancel your event registration easily with our form. #BiharSamajGlobal #UnityInDiversity",
          image:
            "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/cancel.jpg",
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
              "Bihar Samaj Abu Dhabi Blog, Cultural Insights, Community Stories, Bihar Heritage, Jharkhand Culture, Uttar Pradesh Culture, UAE Indian Community, Cultural Experiences",
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
      <LayoutOne title="Cancel Registration">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Event Registration Cancellation</Breadcrumb.Item>
          </Breadcrumb>
          <div className="event-code-title">Cancel Your Registration</div>
          <Row justify="center" className="cancel-registration-container">
            <Col xs={24} sm={18} md={18}>
              <SectionTitle title="Cancellation Form" />
              <Form
                layout="vertical"
                className="cancel-registration-form"
                form={form}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <div className="form-field-container">
                      <Form.Item
                        label="Event ID"
                        name="eventId"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Event ID Number!",
                          },
                          () => ({
                            validator(_, value) {
                              if (!value || /^[a-f\d]{24}$/i.test(value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The Event ID must be a valid 24-character hexadecimal string."
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input
                          name="eventId"
                          onChange={handleInputChange}
                          value={formData.eventId}
                        />
                      </Form.Item>
                      <p>
                        Enter the valid ID you received via email from{" "}
                        <strong>info@biharsamajabudhabi.com</strong> (Event
                        Registration Team - BSAD).
                      </p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-field-container">
                      <Form.Item
                        label="Event Registration Number"
                        name="verificationNumber"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Event Registration Number!",
                          },
                        ]}
                      >
                        <Input
                          name="verificationNumber"
                          onChange={handleInputChange}
                          value={formData.verificationNumber}
                        />
                      </Form.Item>
                      <p>
                        Enter the valid number you received via email from{" "}
                        <strong>info@biharsamajabudhabi.com</strong> (Event
                        Registration Team - BSAD).
                      </p>
                    </div>
                  </Col>
                </Row>
                <Col span={24}>
                  <div className="form-field-container">
                    <Form.Item
                      label="Email ID"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                      ]}
                    >
                      <Input
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                    </Form.Item>
                    <p>
                      Enter the valid email address you used during event
                      registration.
                    </p>
                  </div>
                </Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="cancel-registration-submit"
                    onClick={() => showConfirmationModal()}
                    disabled={!isFormValid}
                  >
                    Submit Cancellation Request
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Container>
        <Modal
          title={
            <>
              <ExclamationCircleOutlined
                style={{ color: "red", marginRight: "10px" }}
              />
              Confirm Cancellation
            </>
          }
          centered
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button
              key="back"
              onClick={() => setIsModalVisible(false)}
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
              }}
            >
              No, Keep Registration
            </Button>,
            <Button
              key="submit"
              onClick={performCancellation}
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            >
              Yes, Cancel Registration
            </Button>,
          ]}
          width={600}
          style={{
            borderRadius: "10px",
            top: 20,
            overflow: "hidden",
          }}
          bodyStyle={{
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              padding: "10px",
            }}
          >
            Are you sure you want to cancel your registration? Once cancelled,
            you will not be eligible to attend the event.
          </p>
        </Modal>
        {/* Testimonial Area Preview */}
        <TestimonialArea />
      </LayoutOne>
    </>
  );
};

export default CancelRegistration;
