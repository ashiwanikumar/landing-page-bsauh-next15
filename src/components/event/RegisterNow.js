import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Divider,
  Tooltip,
  Modal,
  Alert,
} from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import {
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { registerUserToEvent } from "../../apis/eventRegister";
import { useRouter } from "next/router";
import ShareModalOnImage from "../other/ShareModalOnImage";

import statesWithCitiesData from "../../data/states.json";

const initialData = {
  title: "",
  name: "",
  email: "",
  mobile: "",
  numberOfAttendees: 1,
  numberOfAdults: 1,
  numberOfKidsBelowFive: 0,
  numberOfKidsBelowTwelve: 0,
  eventId: "",
};

const applyCssToImages = (content) => {
  return content.replace(
    /<img/g,
    '<img style="width:100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"'
  );
};

// generateContent function to handle different versions of the event
const generateContent = (event) => {
  let htmlContent =
    event.version === "v1" || event.version === undefined
      ? draftToHtml(JSON.parse(event.content))
      : event.content;

  htmlContent = applyCssToImages(htmlContent);

  // Get text content length without HTML tags
  const textLength = htmlContent.replace(/<[^>]*>/g, "").length;
  const shouldTruncate = textLength > 1000;
  let truncatedContent = htmlContent;

  if (shouldTruncate) {
    // Find a good breaking point after 1000 characters of text
    let currentTextLength = 0;
    let breakPoint = 0;
    let inTag = false;

    for (let i = 0; i < htmlContent.length; i++) {
      if (htmlContent[i] === "<") {
        inTag = true;
        continue;
      }
      if (htmlContent[i] === ">") {
        inTag = false;
        continue;
      }
      if (!inTag) {
        currentTextLength++;
      }

      if (currentTextLength >= 1200) {
        // Look for the next period, exclamation mark, or question mark
        const nextPeriod = htmlContent.indexOf(". ", i);
        const nextExclamation = htmlContent.indexOf("! ", i);
        const nextQuestion = htmlContent.indexOf("? ", i);
        const nextParagraph = htmlContent.indexOf("</p>", i);

        // Find the closest break point
        const possibleBreaks = [
          nextPeriod,
          nextExclamation,
          nextQuestion,
          nextParagraph,
        ].filter((pos) => pos !== -1);

        if (possibleBreaks.length > 0) {
          breakPoint = Math.min(...possibleBreaks) + 1;
        } else {
          breakPoint = i;
        }

        break;
      }
    }

    if (breakPoint > 0) {
      truncatedContent = htmlContent.substring(0, breakPoint + 1);

      // Ensure we don't break in the middle of an HTML tag
      const lastOpenTag = truncatedContent.lastIndexOf("<");
      const lastCloseTag = truncatedContent.lastIndexOf(">");

      if (lastOpenTag > lastCloseTag) {
        truncatedContent = truncatedContent.substring(0, lastOpenTag);
      }

      // Add ellipsis if we truncated
      if (truncatedContent.length < htmlContent.length) {
        truncatedContent += "...";
      }
    }
  }

  return {
    htmlContent: truncatedContent,
    fullContent: htmlContent,
    shouldTruncate: shouldTruncate,
  };
};

const RegisterNow = ({ event }) => {
  const router = useRouter();
  const captchaRef = useRef(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [eventId, setEventId] = useState("");
  const [mobilePrefix, setMobilePrefix] = useState("50");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState("");
  const [isCommunityMember, setIsCommunityMember] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = () => {
      const now = new Date();
      const registrationCloseDate = new Date(
        event.registrationDetails.closingDate
      );
      setIsRegistrationClosed(now > registrationCloseDate);
    };

    checkRegistrationStatus();
    // Update status every minute
    const interval = setInterval(checkRegistrationStatus, 60000);
    return () => clearInterval(interval);
  }, [event.registrationDetails.closingDate]);

  // Helper function to convert UTC to local time
  const convertUTCToLocal = (utcDateString) => {
    const date = new Date(utcDateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  // Function to format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const isFormDisabled = () => {
    return isRegistrationClosed || isEventDatePassed() || loading;
  };

  // the content generation
  const { htmlContent, fullContent, shouldTruncate } = generateContent(event);
  const parsedContent = parse(htmlContent);

  useEffect(() => {
    const { slug } = router.query;
    setEventId(slug);

    const updateCountdown = () => {
      const now = new Date();
      const eventDate = new Date(event.eventDate);
      const timeLeft = eventDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [router.query, event.eventDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (
        name === "numberOfAdults" ||
        name === "numberOfKidsBelowFive" ||
        name === "numberOfKidsBelowTwelve"
      ) {
        const totalAttendees =
          parseInt(updatedData.numberOfAdults || 1) +
          parseInt(updatedData.numberOfKidsBelowFive || 0) +
          parseInt(updatedData.numberOfKidsBelowTwelve || 0);

        updatedData.numberOfAttendees = totalAttendees;
      }

      return updatedData;
    });
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 7) {
      form.setFieldsValue({ mobile: value });
    }
  };

  // Add the toggle handler
  const handleReadMore = (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${
      event._id
    }/${event.title.toLowerCase().replace(/ /g, "-")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const submitEventForm = async (values) => {
    try {
      if (isRegistrationClosed) {
        showModal("error", "Registration period has ended.");
        return;
      }

      if (!captchaSuccess) {
        showModal("error", "Please complete the reCAPTCHA verification.");
        return;
      }

      const formattedMobile = `+971 ${mobilePrefix}${values.mobile}`;
      const updatedFormData = {
        ...values,
        mobile: formattedMobile,
        eventId: event._id,
        numberOfAttendees:
          parseInt(values.numberOfAdults || 1) +
          parseInt(values.numberOfKidsBelowFive || 0) +
          parseInt(values.numberOfKidsBelowTwelve || 0),
      };

      setLoading(true);

      const response = await registerUserToEvent(updatedFormData);
      showModal("success", "Registered to the event successfully!");
      form.resetFields();
    } catch (err) {
      const message =
        err?.response?.data?.message || "An error occurred while registering.";
      showModal("error", message);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (type, content) => {
    setModalType(type);
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const navigateBack = () => {
    router.push("/events");
  };

  const isEventDatePassed = () => {
    const today = new Date();
    const eventDate = new Date(event.eventDate);
    return eventDate < today;
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaSuccess(!!value);
  };

  return (
    <>
      <div className="event-registration-container">
        <div className="event-header">
          <Button
            onClick={navigateBack}
            icon={<ArrowLeftOutlined />}
            className="event-nav-back-button"
          >
            Back to Event List
          </Button>
          <ShareModalOnImage
            url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${
              event._id
            }/${event.title.toLowerCase().replace(/ /g, "-")}`}
          />
        </div>

        <h1 className="event-title">🌟 {event.title} 🌟</h1>

        <div className="event-content">
          <div className="event-details">
            <img
              src={event.coverImage}
              alt="Event Cover"
              className="event-cover-image"
            />

            {!isEventDatePassed() && (
              <div className="event-countdown">
                <h3>Event Countdown</h3>
                <div className="countdown-timer">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="countdown-item">
                      <span className="countdown-value">{value}</span>
                      <span className="countdown-label">
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="event-info">
              <p>
                <EnvironmentOutlined /> {event.location}
              </p>
              <p>
                <CalendarOutlined />{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p>
                <InfoCircleOutlined /> {event.description}
              </p>
            </div>

            <div className="event-content-details">
              <div className="event-description">{parsedContent}</div>
              {shouldTruncate && (
                <div className="event-read-more-container">
                  <Link
                    href={`/events/${event._id}/${event.title
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="event-read-more-button"
                    onClick={handleReadMore}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                    <span className="event-read-more-icon">
                      <i className="arrow_carrot-2right" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Divider type="vertical" className="content-divider" />

          <div className="registration-form">
            <h2>Register for the Event</h2>

            {isRegistrationClosed && (
              <Alert
                message="Registration Closed"
                description={`Registration for this event closed on ${formatDate(
                  event.registrationDetails.closingDate
                )}`}
                type="error"
                showIcon
                className="mb-4"
              />
            )}

            <Form form={form} layout="vertical" onFinish={submitEventForm}>
              <Row gutter={16}>
                {/* Title and Name Section */}

                <Col xs={24} sm={8}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      { required: true, message: "Please select your title!" },
                    ]}
                    className="form-field"
                  >
                    <Select placeholder="Title" disabled={isFormDisabled()}>
                      <Select.Option value="Mr">Mr</Select.Option>
                      <Select.Option value="Ms">Ms</Select.Option>
                      <Select.Option value="Mrs">Mrs</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={16}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                    className="form-field"
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Full Name"
                      disabled={isFormDisabled()}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                {/* Number Of Adults Section */}

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="numberOfAdults"
                    label={
                      <span>
                        Number of Adults (12Y+)
                        <Tooltip title="Attendees aged 12 and above">
                          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                        </Tooltip>
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select the number of adults!",
                      },
                      {
                        type: "number",
                        min: 1,
                        message: "Number of adults must be at least 1!",
                      },
                    ]}
                    className="form-field"
                  >
                    <Select
                      placeholder="Select number of adults"
                      disabled={isEventDatePassed()}
                    >
                      {[...Array(10)].map((_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Number Of Kids Below Five Section */}

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="numberOfKidsBelowFive"
                    label={
                      <span>
                        Number of Kids (0-5 Years)
                        <Tooltip title="Children aged 0 to 5 years">
                          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                        </Tooltip>
                      </span>
                    }
                    className="form-field"
                  >
                    <Select
                      placeholder="Select number of kids (0-5 years)"
                      disabled={isEventDatePassed()}
                    >
                      {[...Array(6)].map((_, i) => (
                        <Select.Option key={i} value={i}>
                          {i}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Number Of Kids Below Twelve Section */}

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="numberOfKidsBelowTwelve"
                    label={
                      <span>
                        Number of Kids (5-12 Years)
                        <Tooltip title="Children aged 5 to 12 years">
                          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                        </Tooltip>
                      </span>
                    }
                    className="form-field"
                  >
                    <Select
                      placeholder="Select number of kids (5-12 years)"
                      disabled={isEventDatePassed()}
                    >
                      {[...Array(6)].map((_, i) => (
                        <Select.Option key={i} value={i}>
                          {i}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Email Section */}

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "Please enter a valid email address!",
                      },
                    ]}
                    className="form-field"
                  >
                    <Input
                      prefix={<MailOutlined />}
                      type="email"
                      placeholder="email@example.com"
                      disabled={isEventDatePassed()}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Mobile Number Section */}

              <Form.Item
                name="mobile"
                label="Mobile Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile number!",
                  },
                  {
                    pattern: /^\d{7}$/,
                    message: "Please enter exactly 7 digits!",
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.length !== 7) {
                        return Promise.reject(
                          "Mobile number must be exactly 7 digits!"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                className="form-field"
              >
                <Input.Group compact>
                  <Input style={{ width: "20%" }} value="+971" disabled />
                  <Select
                    defaultValue="50"
                    style={{ width: "20%" }}
                    onChange={(value) => setMobilePrefix(value)}
                  >
                    <Select.Option value="50">50</Select.Option>
                    <Select.Option value="52">52</Select.Option>
                    <Select.Option value="54">54</Select.Option>
                    <Select.Option value="55">55</Select.Option>
                    <Select.Option value="56">56</Select.Option>
                    <Select.Option value="58">58</Select.Option>
                  </Select>
                  <Input
                    style={{ width: "60%" }}
                    maxLength={7}
                    onChange={handleMobileChange}
                    placeholder="Enter 7 digit number"
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Input.Group>
              </Form.Item>

              {/* Agreement Accept Section */}

              <Form.Item
                name="agreement"
                valuePropName="checked"
                className="form-field"
              >
                <div className="agreement-container">
                  <Switch
                    checkedChildren="Accepted"
                    unCheckedChildren="Decline"
                    checked={disclaimerAccepted}
                    onChange={(value) => setDisclaimerAccepted(value)}
                    disabled={isEventDatePassed()}
                    className={`custom-switch ${
                      disclaimerAccepted ? "switch-accepted" : "switch-declined"
                    }`}
                  />
                  <span className="agreement-text">
                    I acknowledge and accept the{" "}
                    <a
                      href="#"
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/privacy-policy`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="privacy-policy-link"
                    >
                      privacy policy
                    </a>
                  </span>
                </div>
              </Form.Item>

              {/* Are you a member of the community? */}
              <Form.Item
                name="isCommunityMember"
                label={
                  <span>
                    Are you a member of the community?{" "}
                    <Tooltip title="Select 'Yes' if you are a registered member of the community.">
                      <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                    </Tooltip>
                  </span>
                }
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
                className="form-field"
              >
                <Select
                  placeholder="Select"
                  onChange={(value) => setIsCommunityMember(value === "Yes")}
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>

              {/* Message for community members */}
              {isCommunityMember && (
                <div className="community-member-message">
                  Please use your registered mobile number and email ID.
                </div>
              )}

              {/* Conditional fields for non-members */}
              {!isCommunityMember && (
                <>
                  <Form.Item
                    name="country"
                    label="Country"
                    initialValue="India"
                    rules={[
                      {
                        required: true,
                        message: "Please select your country!",
                      },
                    ]}
                    className="form-field"
                  >
                    <Select disabled>
                      <Select.Option value="India">India</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="state"
                    label="State"
                    rules={[
                      { required: true, message: "Please select your state!" },
                    ]}
                    className="form-field"
                  >
                    <Select
                      placeholder="Select your state"
                      onChange={(value) => setSelectedState(value)}
                    >
                      {Object.keys(statesWithCitiesData).map((state) => (
                        <Select.Option key={state} value={state}>
                          {state}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      { required: true, message: "Please select your city!" },
                    ]}
                    className="form-field"
                  >
                    <Select placeholder="Select your city">
                      {selectedState &&
                        statesWithCitiesData[selectedState].map((city) => (
                          <Select.Option key={city} value={city}>
                            {city}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </>
              )}

              <div className="recaptcha-container">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                />
                {isFormDisabled() && <div className="recaptcha-overlay"></div>}
              </div>
              <Form.Item>
                <Button
                  className="submit-button"
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                  disabled={!disclaimerAccepted || isFormDisabled()}
                >
                  {loading
                    ? "Submitting..."
                    : isRegistrationClosed
                    ? "Registration Closed"
                    : isEventDatePassed()
                    ? "Event Has Ended"
                    : "Submit"}
                </Button>
              </Form.Item>

              {/* Registration status info */}
              <div className="registration-status">
                <p>
                  Registration Period:{" "}
                  {formatDate(event.registrationDetails.openingDate)} -{" "}
                  {formatDate(event.registrationDetails.closingDate)}
                </p>
                {isRegistrationClosed && (
                  <p className="registration-closed-message">
                    Registration period has ended. Thank you for your interest.
                  </p>
                )}
              </div>

              <div className="cancel-registration-wrapper">
                <div className="cancel-registration-card">
                  <h4 className="cancel-title">Already Registered?</h4>
                  <p className="cancel-description">
                    You can cancel your registration if needed
                  </p>
                  <Button
                    type="default"
                    className="cancel-registration-button"
                    onClick={() => router.push("/events/cancel-registration")}
                  >
                    Cancel Registration
                  </Button>
                </div>
              </div>
            </Form>

            <div className="event-info-message">
              <ul className="event-join-info">
                <li>
                  Only members of the Bihar Samaj Community can register for
                  this event.
                </li>
                <li>
                  Not a member yet? Please join our Community to be eligible for
                  event registration.
                  <Link
                    href="/information/registration"
                    className="join-community-button"
                  >
                    Join
                  </Link>
                </li>
                <li>
                  We respect your privacy. No sensitive data is sold or misused.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        <Modal
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
          footer={null}
          closeIcon={<CloseCircleOutlined />}
          className={`custom-modal ${modalType}`}
        >
          <div className={`modal-content ${modalType}`}>
            {modalType === "success" ? (
              <CheckCircleOutlined className="modal-icon success" />
            ) : (
              <CloseCircleOutlined className="modal-icon error" />
            )}
            <h3>{modalType === "success" ? "Success!" : "Error"}</h3>
            <p>{modalContent}</p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RegisterNow;
