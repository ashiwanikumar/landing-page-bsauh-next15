// Import necessary React and Ant Design components
import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  Modal,
  Breadcrumb,
  InputNumber,
  message,
  Row,
  Col,
  Card,
  Divider,
} from "antd";
import ReCAPTCHA from "react-google-recaptcha";
// Import layout and other components
import { LayoutOne, Container, TestimonialArea } from "@components";
// Import skill
import skillOptions from "@data/skillOptions.json";
//Next Seo
import { NextSeo } from "next-seo";
import Head from "next/head";

// Import  APIs
import {
  registerUserToTalent,
  sendTalentRegistrationOTP,
  verifyTalentRegistrationOTP,
  // Upload picture
  uploadTalentProfilePicture,
} from "../../../apis/talentRegistration";

const { Option } = Select;

const TalentRegistrationForm = () => {
  console.log("Talent Registration Form");

  const [form] = Form.useForm();
  const captchaRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [skillLevels, setSkillLevels] = useState([]);
  const [isCommunityMember, setIsCommunityMember] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableVerifyEmailButton, setDisableVerifyEmailButton] =
    useState(false);

  const [profilePicUrl, setProfilePicUrl] = useState("");

  // OTP
  const [verifiedOtpId, setVerifiedOtpId] = useState("");

  // Consolidate form value change handling
  const handleFormValuesChange = (changedValues, allValues) => {
    // Check if primarySkill has changed and update skill levels accordingly
    if (changedValues.hasOwnProperty("primarySkill")) {
      const newPrimarySkill = changedValues.primarySkill;
      const selectedSkill = skillOptions.skills[newPrimarySkill];
      if (selectedSkill) {
        const skillCategories =
          selectedSkill.genres ||
          selectedSkill.types ||
          selectedSkill.styles ||
          selectedSkill.instruments ||
          selectedSkill.forms ||
          [];
        setSkillLevels(skillCategories);
      } else {
        setSkillLevels([]);
      }
    }

    // Continue with your existing validation logic for sending OTP
    const fieldsToValidate = [
      "email",
      "fullName",
      "contactNumber",
      "primarySkill",
      "skillLevel",
      "yearsOfExperience",
      "age",
      "performanceType",
      "agreement",
    ];
    form
      .validateFields(fieldsToValidate)
      .then(() => {
        // setIsSendingOtp(allValues.agreement); // Enable OTP button if agreement is checked
      })
      .catch(() => {
        // setIsSendingOtp(false); // Disable OTP button if form validation fails
      });
  };

  // Function to send OTP
  const handleSendOtp = async () => {
    setLoading(true); // Display loading modal
    setIsSendingOtp(true);

    // Disable verify button
    setDisableVerifyEmailButton(true);

    try {
      const response = await sendTalentRegistrationOTP({
        email: form.getFieldValue("email"),
      });
      setLoading(false); // Hide loading modal
      if (response.status === 200) {
        setIsOtpSent(true); // Enable OTP input fields
        setIsSendingOtp(false);

        message.success("OTP sent successfully.");
      } else {
        message.error("Failed to send OTP.");
        setIsSendingOtp(false);
      }
    } catch (error) {
      setLoading(false); // Hide loading modal
      setIsSendingOtp(false);

      message.error(`Error sending OTP: ${error.message}`);
    }
  };

  // Function to verify OTP
  const handleOtpVerification = async (otp) => {
    setLoading(true); // Display loading modal

    try {
      const response = await verifyTalentRegistrationOTP({
        otp,
        email: form.getFieldValue("email"),
      });
      setLoading(false); // Hide loading modal

      if (response.status === 200) {
        setIsOtpVerified(true);
        setVerifiedOtpId(response.data.otpId); // Save the otpId from the server response
        message.success("OTP verified successfully.");
      } else {
        message.error("Failed to verify OTP.");
      }
    } catch (error) {
      setLoading(false); // Hide loading modal
      message.error(`Error verifying OTP: ${error.message}`);
    }
  };

  // Define the handler for reCAPTCHA changes
  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  // Form submission handling
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Format the contact number
      const fullContactNumber = `+971 ${values.areaCode}${values.contactNumber}`;

      // Include the formatted contact number in the submission data
      const submissionData = {
        ...values,
        contactNumber: fullContactNumber, // replace the simple number with the formatted number
        otp: verifiedOtpId,
        profilePhoto: profilePicUrl,
      };

      const response = await registerUserToTalent(submissionData);
      setLoading(false);
      if (response.status === 201) {
        setIsModalVisible(true);
        message.success("Registration successful!");
      } else {
        message.error("Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      message.error(`Registration failed: ${error.message}`);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setIsOtpVerified(false);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setIsOtpVerified(false);
    form.resetFields();
  };

  const handleUpdateForm = (values) => {
    setFormData(values);
    setIsModalVisible(false);
  };

  // Handler for community membership confirmation
  const handleCommunityMemberConfirmation = (isMember) => {
    setIsCommunityMember(isMember);
  };

  // ** Upload Profile Picture
  const beforeProfileUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error("Image must smaller than 1MB!");
      return false;
    }

    return isJpgOrPng && isLt1M;
  };

  // Function to handle profile picture upload
  const handleUploadProfilePicture = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const response = await uploadTalentProfilePicture(formData, config);
      if (response.status === 200) {
        onSuccess(response);
        // Assuming the response.data.url contains the URL of the uploaded image
        setFormData({
          ...formData,
          profilePhoto: response.data.url,
        });

        setProfilePicUrl(response.data.url);
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      onError(error);
    }
  };

  // JSON-LD structured data for SEO enhancement
  const talentRegistrationJsonLd = {
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
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(talentRegistrationJsonLd)}
        </script>
      </Head>
      <NextSeo
        title="Showcase Your Talent with Bihar Samaj Abu Dhabi - Talent Registration"
        description="Unleash your potential and join the ranks of esteemed talents in Bihar Samaj Abu Dhabi. Our streamlined registration process lets you easily showcase your skills and connect with a vibrant community."
        canonical="https://www.biharsamajabudhabi.com/community/talent-registration"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/community/talent-registration",
          title:
            "Showcase Your Talent with Bihar Samaj Abu Dhabi - Talent Registration",
          description:
            "Unleash your potential and join the ranks of esteemed talents in Bihar Samaj Abu Dhabi. Our streamlined registration process lets you easily showcase your skills and connect with a vibrant community.",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/talentregistration/talent.png",
              width: 1200,
              height: 630,
              alt: "Bihar Samaj Abu Dhabi Talent Registration Banner",
            },
          ],
          site_name: "Bihar Samaj Abu Dhabi",
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title:
            "Showcase Your Talent with Bihar Samaj Abu Dhabi - Talent Registration",
          description:
            "Unleash your potential and join the ranks of esteemed talents in Bihar Samaj Abu Dhabi. Our streamlined registration process lets you easily showcase your skills and connect with a vibrant community.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/talentregistration/talent.png",
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
              "Talent Registration, Bihar Samaj Abu Dhabi, Showcase Talent, Indian Community in UAE, Cultural Talent in Abu Dhabi, Art and Culture, Music, Dance, Talent Show Abu Dhabi, Community Talent Events, Talent Platform in UAE, Bihar Culture Showcase, Talent Discovery, Abu Dhabi Talent Community",
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

      <LayoutOne title="Talent Registration">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Talent Registration</Breadcrumb.Item>
          </Breadcrumb>

          <div className="member-card-title">
            Discover Your Stage: Unleash Your Talent with Bihar Samaj Abu Dhabi:
          </div>

          <Row justify="center" className="cancel-registration-container">
            <Col xs={24} sm={18} md={18}>
              {/* Assuming SectionTitle is a custom component for displaying section titles */}
              {/* <SectionTitle title="Talent Registration" /> */}

              {isCommunityMember === null && (
                <Card
                  className="community-verification-card"
                  style={{ textAlign: "center" }}
                >
                  <h2>Are you a member of the community?</h2>
                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <Button
                      className="member-confirmation-button yes-member"
                      onClick={() => handleCommunityMemberConfirmation(true)}
                    >
                      Yes, I'm a member
                    </Button>
                    <Button
                      className="member-confirmation-button no-member"
                      onClick={() => handleCommunityMemberConfirmation(false)}
                    >
                      No, I need to register
                    </Button>
                  </div>
                </Card>
              )}

              <p className="community-info">
                Discover the joy of connection in the Bihar Samaj Abu Dhabi
                community, where cultural passion meets opportunity. Dive into
                events, workshops, and showcases that celebrate our rich
                diversity. Your journey of growth and engagement starts here!
              </p>

              {isCommunityMember === false && (
                <Card className="community-verification-card">
                  <p>
                    To become a community member and unlock new opportunities,
                    please visit the{" "}
                    <a
                      className="registration-link"
                      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/registration`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      registration page
                    </a>
                    .
                  </p>
                  <p>
                    If you are already a community member and arrived here by
                    mistake, no worries!
                  </p>
                  <Button
                    className="member-confirmation-button yes-member"
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/community/talent-registration`}
                    target="_blank"
                  >
                    Join Talent Registration
                  </Button>
                </Card>
              )}

              {isCommunityMember && (
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="cancel-registration-form"
                  onValuesChange={handleFormValuesChange}
                >
                  <Divider orientation="left">Talent Registration Form</Divider>

                  {/* Personal Information Section */}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true }]}
                        className="custom-validation"
                      >
                        <Input
                          placeholder="Enter your full name"
                          disabled={isEditMode}
                        />
                      </Form.Item>
                    </Col>

                    {/* Contact Number */}
                    <Col span={12}>
                      <Form.Item
                        label="Contact Number"
                        required // This visually indicates that the field is required but doesn't enforce validation
                        className="custom-validation"
                      >
                        <Input.Group compact>
                          <Input
                            style={{ width: "20%", textAlign: "center" }}
                            defaultValue="+971"
                            disabled
                          />
                          <Form.Item name="areaCode" noStyle initialValue="56">
                            <Select style={{ width: "30%" }}>
                              <Option value="50">50</Option>
                              <Option value="52">52</Option>
                              <Option value="54">54</Option>
                              <Option value="55">55</Option>
                              <Option value="56">56</Option>
                              <Option value="58">58</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="contactNumber"
                            noStyle
                            rules={[
                              {
                                required: true,
                                message: "Please enter your phone number",
                              },
                              {
                                validator: (_, value) => {
                                  if (!value)
                                    return Promise.reject(
                                      new Error("Phone number is required")
                                    );
                                  const sanitizedValue = value.replace(
                                    /[^\d]/g,
                                    ""
                                  );
                                  if (sanitizedValue.length !== 7) {
                                    return Promise.reject(
                                      new Error(
                                        "Mobile number must be 7 digits"
                                      )
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Input
                              style={{ width: "50%" }}
                              maxLength={7}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            />
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Email */}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        className="custom-validation"
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

                    {/* Age */}
                    <Col span={12}>
                      <Form.Item
                        name="age"
                        label="Age"
                        className="custom-validation"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            min: 1,
                            max: 99,
                            message: "Please input a valid age (0-99)!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          max={99}
                          maxLength={2}
                          style={{ width: "100%" }}
                          placeholder="Enter your age"
                          keyboard={false} // This prop doesn't exist in Ant Design, but you can control input as shown below
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Skills */}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="primarySkill"
                        label="Primary Skill"
                        className="custom-validation"
                        rules={[
                          {
                            required: true,
                            message: "Please select your primary skill!",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select your primary skills"
                          allowClear
                        >
                          {Object.keys(skillOptions.skills).map((skill) => (
                            <Option key={skill} value={skill}>
                              {skill.charAt(0).toUpperCase() +
                                skill.slice(1).replace(/_/g, " ")}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Skill level */}
                    <Col span={12}>
                      <Form.Item
                        name="skillLevel"
                        label="Skill Level"
                        className="custom-validation"
                        rules={[
                          {
                            required: true,
                            message: "Please select your skill level!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select your skill level"
                          allowClear
                        >
                          <Option value="beginner">Beginner</Option>
                          <Option value="intermediate">Intermediate</Option>
                          <Option value="advanced">Advanced</Option>
                          <Option value="expert">Expert</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Years of Experience */}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="yearsOfExperience"
                        label="Years of Experience"
                        className="custom-validation"
                        rules={[
                          {
                            required: true,
                            type: "number",
                            min: 1,
                            max: 99,
                            message: "Please input a valid number of years!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          max={99}
                          maxLength={2}
                          style={{ width: "100%" }}
                          placeholder="Enter years of experience"
                          keyboard={false} // This prop doesn't exist in Ant Design, but you can control input as shown below
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>

                    {/* Performance Details */}
                    <Col span={12}>
                      <Form.Item
                        name="performanceType"
                        label="Preferred Performance Type"
                        className="custom-validation"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Option value="solo">Solo</Option>
                          <Option value="duo">Duo</Option>
                          <Option value="group">Group</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Performance Description */}
                  <Form.Item
                    name="performanceDescription"
                    label="Brief Description of Performance"
                  >
                    <Input.TextArea maxLength={300} showCount />
                  </Form.Item>

                  {/* Additional Information */}
                  <Form.Item
                    name="previousExperience"
                    label="Previous Performance Experience"
                  >
                    <Input.TextArea maxLength={300} showCount />
                  </Form.Item>

                  {/* Performance Video */}
                  <Form.Item
                    name="performanceVideo"
                    label="Link to Performance Video (if available)"
                  >
                    <Input />
                  </Form.Item>

                  {/* Social Media */}
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="facebookProfile"
                        label="Facebook Profile"
                      >
                        <Input placeholder=" https://www.facebook.com/yourprofile" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="instagramProfile"
                        label="Instagram Profile"
                      >
                        <Input placeholder="https://www.instagram.com/yourprofile" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Profile Photo Upload */}
                  <Form.Item name="profilePhoto" label="Upload Profile Photo">
                    <Row>
                      <Col span={24} className="upload-photo-section-full">
                        <Upload
                          name="profilePhoto"
                          listType="picture-card"
                          customRequest={handleUploadProfilePicture}
                          showUploadList={false}
                          beforeUpload={beforeProfileUpload}
                          className="upload-photo-button-talent"
                        >
                          {/* SVG content */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="#099f4a"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            >
                              <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
                              <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21Z" />
                            </g>
                          </svg>
                        </Upload>
                        {formData.profilePhoto && (
                          <img
                            src={formData.profilePhoto}
                            alt="profile"
                            className="uploaded-photo"
                            style={{ maxWidth: "100%", margin: "10px 0" }}
                          />
                        )}
                        {formData.profilePhoto && (
                          <Button
                            className="delete-photo-button-talent"
                            onClick={() =>
                              setFormData({ ...formData, profilePhoto: null })
                            }
                            style={{ display: "block", marginTop: "10px" }}
                          >
                            Delete Photo
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Form.Item>

                  <div className="profile-photo-message">
                    <p>
                      Profile photos or pictures may be used for promotional
                      purposes. For more information, please read the{" "}
                      <a
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/information/privacy-policy`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BSAD Privacy Notice
                      </a>
                      .
                    </p>
                  </div>

                  {/* Consent and Confirmation */}
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    className="custom-validation"
                    rules={[
                      {
                        required: true,
                        message: "You must agree to the terms and conditions.",
                      },
                    ]}
                  >
                    <Checkbox>
                      I agree to the terms and conditions, including photo and
                      video consent for promotional use.
                    </Checkbox>
                  </Form.Item>

                  {/* Verify Email*/}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Form.Item
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.email !== currentValues.email ||
                        prevValues.agreement !== currentValues.agreement
                      }
                    >
                      {({ getFieldValue }) => (
                        <Button
                          type="primary"
                          onClick={handleSendOtp}
                          disabled={
                            !getFieldValue("email") ||
                            !getFieldValue("agreement") ||
                            disableVerifyEmailButton
                          }
                          loading={isSendingOtp}
                        >
                          Verify Email
                        </Button>
                      )}
                    </Form.Item>
                  </div>

                  {/* Email OTP Verification */}
                  <Form.Item label="Email OTP Verification">
                    <Row gutter={8}>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <Col key={index} span={4}>
                          <Form.Item
                            name={`otp_${index}`}
                            rules={[{ required: true, message: " " }]}
                          >
                            <Input
                              className="otp-input"
                              maxLength={1}
                              disabled={!isOtpSent || isOtpVerified}
                              onChange={(e) => {
                                const nextInputIndex = index + 1;
                                if (
                                  e.target.value.length === 1 &&
                                  nextInputIndex < 6
                                ) {
                                  form
                                    .getFieldInstance(`otp_${nextInputIndex}`)
                                    .focus();
                                }
                                if (nextInputIndex === 6) {
                                  const otp = Array.from({ length: 6 })
                                    .map((_, i) =>
                                      form.getFieldValue(`otp_${i}`)
                                    )
                                    .join("");
                                  if (otp.length === 6) {
                                    handleOtpVerification(otp);
                                  }
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                  </Form.Item>

                  {/* Recaptcha check */}
                  {isOtpVerified && (
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
                  )}

                  {/* Submit Button */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!isOtpVerified || !recaptchaVerified}
                    >
                      Submit
                    </Button>
                  </Form.Item>

                  {loading && (
                    <div className="loading-overlay-talent">
                      <div className="loading-spinner-talent"></div>
                    </div>
                  )}

                  <Modal
                    title={isEditMode ? "Update Form" : "Form Submitted"}
                    visible={isModalVisible}
                    onOk={isEditMode ? handleUpdateForm : handleModalOk}
                    onCancel={handleModalCancel}
                    footer={[
                      <Button key="back" onClick={handleModalCancel}>
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        onClick={isEditMode ? handleUpdateForm : handleModalOk}
                      >
                        {isEditMode ? "Update" : "OK"}
                      </Button>,
                    ]}
                  >
                    {isEditMode ? (
                      <Form form={form} onFinish={handleUpdateForm}>
                        <Form.Item
                          name="contactNumber"
                          label="Contact Number"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="age"
                          label="Age"
                          rules={[
                            {
                              required: true,
                              type: "number",
                              min: 0,
                              max: 100,
                            },
                          ]}
                        >
                          <Input type="number" />
                        </Form.Item>

                        {/* Additional fields for update can be added here */}
                      </Form>
                    ) : (
                      <p>Your form has been submitted successfully!</p>
                    )}
                  </Modal>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
        {/* Testimonial Area Preview */}
        <TestimonialArea />
      </LayoutOne>
    </>
  );
};
export default TalentRegistrationForm;
