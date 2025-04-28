import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Rate,
  message,
  Typography,
  Breadcrumb,
  Upload,
  Select,
  Space,
  Col,
  Row,
} from "antd";
import { NextSeo } from "next-seo";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
  MailOutlined,
  GlobalOutlined,
  ShareAltOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  WhatsAppOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { LayoutOne, Container } from "@components";
import dynamic from "next/dynamic";
import { uploadTalentProfilePicture } from "@apis/talentRegistration";
import { createCommunityMember } from "@apis/communityMember";
import ReCAPTCHA from "react-google-recaptcha";
import confetti from "canvas-confetti";

// Dynamically import ReCAPTCHA and confetti to avoid hydration issues
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

const DynamicConfetti = dynamic(() => import("canvas-confetti"), {
  ssr: false,
});

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const socialPlatforms = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
];

const defaultSocialProfiles = {
  facebook: "https://www.facebook.com/BiharSamajAbuDhabiOfficial",
  instagram: "https://www.instagram.com/biharsamajabudhabi_official",
  tiktok: "https://www.tiktok.com/@biharsamajabudhabi",
  linkedin: "https://www.linkedin.com/showcase/biharsamajabudhabiofficial/",
  twitter: "https://x.com/samaj_bihar",
};

const defaultProfilePicture =
  "https://bsauh-uae.s3.ap-south-1.amazonaws.com/bsauh-gallery-bucket/logo.png";

const ShareExperience = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", message: "" });
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [imageUploadModalVisible, setImageUploadModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);

  // Use useEffect to set isBrowser to true after component mounts
  useEffect(() => {
    setIsBrowser(true);
    setDefaultFormValues();
  }, []);

  const setDefaultFormValues = () => {
    form.setFieldsValue({
      role: "Community Member",
    });
  };

  const showModal = (type, message) => {
    setModalContent({ type, message });
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 15000);
  };

  const showLoadingModal = () => {
    setLoadingModalVisible(true);
  };

  const hideLoadingModal = () => {
    setLoadingModalVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    showLoadingModal(); // Show loading modal

    try {
      // Transform social profiles to match the schema
      let socialMedia = {};
      if (values.socialProfiles && values.socialProfiles.length > 0) {
        values.socialProfiles.forEach((profile) => {
          socialMedia[profile.platform] = profile.url;
        });
      } else {
        // Use default social profiles if user didn't provide any
        socialMedia = { ...defaultSocialProfiles };
      }

      // Prepare the data to match the schema
      const formData = {
        ...values,
        socialMedia,
        profilePicture: profilePicUrl || defaultProfilePicture, // Use default if no picture was uploaded
        isApproved: false,
        featured: false,
        metaDescription: values.reviewMessage.slice(0, 160),
        ratingCount: values.rating,
        role: values.role,
        createdBy: values.name,
      };

      delete formData.socialProfiles;
      if (formData.role !== "Other") {
        delete formData.otherRole;
      }

      console.log("Form data to be submitted:", formData);

      // Call the createCommunityMember API
      const response = await createCommunityMember(formData);
      console.log("API response:", response);

      if (response && response.status === 201) {
        hideLoadingModal(); // Hide loading modal
        showModal(
          "success",
          "Your experience has been submitted successfully!"
        );
        form.resetFields();
        setDefaultFormValues();
        setProfilePicUrl("");

        // Use the dynamically imported confetti
        if (isBrowser && DynamicConfetti) {
          DynamicConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        throw new Error(response?.message || "Failed to submit experience");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      hideLoadingModal(); // Hide loading modal
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Community Member already exists"
      ) {
        showModal(
          "error",
          "A community member with this email already exists. Please use a different email or update your existing profile."
        );
      } else {
        showModal(
          "error",
          `An error occurred while submitting your experience: ${error.message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLessThan1MB = file.size / 1024 / 1024 < 1;

    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    });

    if (!isJpgOrPng) message.error("You can only upload JPG/PNG files!");
    if (!isLessThan1MB) message.error("Image must be smaller than 1MB!");
    return isJpgOrPng && isLessThan1MB;
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareUrl =
    "https://www.biharsamajabudhabi.com/community/member-feedback"; // Update this to your actual URL
  const shareTitle = encodeURIComponent(
    "Share Your Digital Journey with Bihar Samaj Abu Dhabi"
  );

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      shareUrl
    )}&title=${shareTitle}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${encodeURIComponent(
      shareUrl
    )}`,
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    if (isBrowser && navigator.clipboard) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          message.success("Link copied to clipboard!");
        })
        .catch(() => {
          message.error("Failed to copy link. Please try again.");
        });
    }
  };

  const dummyRecaptchaChange = () => {
    // This function is intentionally left empty
  };

  // Function to handle profile picture upload
  const handleUploadProfilePicture = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    setImageUploadModalVisible(true);

    try {
      const response = await uploadTalentProfilePicture(formData, config);
      if (response.status === 200) {
        onSuccess(response);
        form.setFieldsValue({ profilePicture: response.data.url });
        setProfilePicUrl(response.data.url);
        message.success("Profile picture uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      onError(error);
      message.error(
        `An error occurred while uploading the profile picture: ${error.message}`
      );
    } finally {
      setImageUploadModalVisible(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <NextSeo
        title="Share Your Digital Journey | Bihar Samaj Abu Dhabi"
        description="Share your digital experience and feedback with the Bihar Samaj community in Abu Dhabi. Your insights help us grow, improve, and strengthen our cultural bonds in the digital age."
        canonical="https://www.biharsamajabudhabi.com/community/member-feedback"
        openGraph={{
          url: "https://www.biharsamajabudhabi.com/community/member-feedback",
          title: "Share Your Digital Journey | Bihar Samaj Abu Dhabi",
          description:
            "Share your digital experience with Bihar Samaj Abu Dhabi. Your insights help us grow and strengthen our community in the digital age.",
          site_name: "Bihar Samaj Abu Dhabi",
          images: [
            {
              url: "https://www.biharsamajabudhabi.com/assets/images/member-feedback/member-feedback.png", // Replace with the actual image URL
              width: 1200,
              height: 600,
              alt: "Bihar Samaj Abu Dhabi Member Feedback",
            },
          ],
        }}
        twitter={{
          handle: "@samaj_bihar",
          site: "@samaj_bihar",
          cardType: "summary_large_image",
          title: "Share Your Digital Journey | Bihar Samaj Abu Dhabi",
          description:
            "Share your digital experience with Bihar Samaj Abu Dhabi. Your insights help us grow and strengthen our community in the digital age.",
          image:
            "https://www.biharsamajabudhabi.com/assets/images/member-feedback/member-feedback.png", // Replace with the actual image URL
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
              "Bihar Samaj Abu Dhabi, Member Feedback, Digital Journey, Community Engagement, Cultural Unity UAE, Bihar Culture, Jharkhand Culture, UP Culture, Indian Community UAE",
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

      <LayoutOne title="Share Your Experience">
        <Container>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <i className="fas fa-home" />
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Community Members</Breadcrumb.Item>
          </Breadcrumb>

          <Row justify="center">
            <Col span={24}>
              <div className="member-feedback__gradient-background">
                <div className="event-code-title">
                  Share Your Digital Journey with Bihar Samaj Abu Dhabi
                </div>

                <Row justify="center">
                  <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                    <div className="member-feedback__content">
                      <Paragraph className="member-feedback__description">
                        Connect with the Bihar Samaj community in Abu Dhabi by
                        sharing your unique digital story. Your insights help us
                        grow in this interconnected world.
                      </Paragraph>

                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="member-feedback__form"
                      >
                        <div className="form-row">
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your name",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Your Name"
                            />
                          </Form.Item>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email",
                              },
                            ]}
                          >
                            <Input
                              prefix={<MailOutlined />}
                              placeholder="your.email@example.com"
                            />
                          </Form.Item>
                        </div>

                        <div className="form-row">
                          <Form.Item
                            name="profilePicture"
                            label="Profile Picture"
                          >
                            <Upload
                              customRequest={handleUploadProfilePicture}
                              maxCount={1}
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                            >
                              <Button icon={<UploadOutlined />}>
                                {profilePicUrl
                                  ? "Change Profile Picture"
                                  : "Upload Profile Picture"}
                              </Button>
                            </Upload>
                          </Form.Item>
                          {profilePicUrl && (
                            <img
                              src={profilePicUrl}
                              alt="Profile"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                marginBottom: "20px",
                              }}
                            />
                          )}
                          <Form.Item
                            name="bio"
                            label="Bio"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your bio",
                              },
                              {
                                min: 10,
                                message: "Bio must be at least 10 characters",
                              },
                              {
                                max: 150,
                                message: "Bio must be maximum 150 characters",
                              },
                            ]}
                          >
                            <TextArea
                              rows={3}
                              maxLength={150}
                              showCount
                              placeholder="Tell us about yourself in 150 characters or less"
                            />
                          </Form.Item>
                        </div>

                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[
                            {
                              required: true,
                              message: "Please select your role",
                            },
                          ]}
                        >
                          <Select>
                            <Option value="Community Member">
                              Community Member
                            </Option>
                            <Option value="Public">Public</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>

                        {form.getFieldValue("role") === "other" && (
                          <Form.Item
                            name="otherRole"
                            label="Specify Role"
                            rules={[
                              {
                                required: true,
                                message: "Please specify your role",
                              },
                            ]}
                          >
                            <Input placeholder="Please specify your role" />
                          </Form.Item>
                        )}

                        <Form.List name="socialProfiles">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, ...restField }) => (
                                <Space
                                  key={key}
                                  style={{ display: "flex", marginBottom: 8 }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, "platform"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing platform",
                                      },
                                    ]}
                                  >
                                    <Select
                                      style={{ width: 130 }}
                                      placeholder="Select platform"
                                    >
                                      {socialPlatforms.map((platform) => (
                                        <Option
                                          key={platform.value}
                                          value={platform.value}
                                        >
                                          {platform.label}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "url"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing URL",
                                      },
                                    ]}
                                  >
                                    <Input
                                      prefix={<GlobalOutlined />}
                                      placeholder="Profile URL"
                                    />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                  />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Add Social Profile (Optional)
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>

                        <Form.Item
                          name="reviewMessage"
                          label="Your Experience"
                          rules={[
                            {
                              required: true,
                              message: "Please share your experience",
                            },
                            {
                              min: 50,
                              message:
                                "Your experience should be at least 50 characters",
                            },
                            {
                              max: 500,
                              message:
                                "Your experience should not exceed 500 characters",
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            showCount
                            maxLength={500}
                            placeholder="Share your digital journey with the Bihar Samaj community (50-500 characters)"
                          />
                        </Form.Item>

                        <div className="form-row">
                          <Form.Item
                            name="rating"
                            label="Rate Your Experience"
                            rules={[
                              {
                                required: true,
                                message: "Please rate your experience",
                              },
                            ]}
                          >
                            <Rate />
                          </Form.Item>
                        </div>

                        {/* Conditionally render ReCAPTCHA only on client-side */}
                        {isBrowser && (
                          <Form.Item>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                              }}
                            >
                              <ReCAPTCHA
                                sitekey={
                                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                }
                                onChange={dummyRecaptchaChange}
                              />
                            </div>
                          </Form.Item>
                        )}

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="member-feedback__submit-btn"
                          >
                            Share Your Digital Experience
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </LayoutOne>

      {/* Share Button - only show on client side */}
      {isBrowser && (
        <>
          <div className="share-button" onClick={toggleShareOptions}>
            <ShareAltOutlined />
            <span>Share</span>
          </div>

          {/* Share Options Popup */}
          {showShareOptions && (
            <div className="share-options-popup">
              <Button
                icon={<FacebookFilled />}
                onClick={() => handleShare("facebook")}
                style={{ backgroundColor: "#3b5998", color: "white" }}
              />
              <Button
                icon={<TwitterOutlined />}
                onClick={() => handleShare("twitter")}
                style={{ backgroundColor: "#1da1f2", color: "white" }}
              />
              <Button
                icon={<LinkedinFilled />}
                onClick={() => handleShare("linkedin")}
                style={{ backgroundColor: "#0077b5", color: "white" }}
              />
              <Button
                icon={<WhatsAppOutlined />}
                onClick={() => handleShare("whatsapp")}
                style={{ backgroundColor: "#25D366", color: "white" }}
              />
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopyLink}
                style={{ backgroundColor: "#6c757d", color: "white" }}
              />
            </div>
          )}
        </>
      )}

      {loadingModalVisible && (
        <div className="member-feedback__modal">
          <div className="member-feedback__modal-backdrop"></div>
          <div className="member-feedback__modal-content member-feedback__modal-loading">
            <h3>Submitting Your Experience</h3>
            <p>Please wait while we process your submission...</p>
            <div className="member-feedback__loading-spinner"></div>
          </div>
        </div>
      )}

      {imageUploadModalVisible && (
        <div className="member-feedback__modal">
          <div className="member-feedback__modal-backdrop"></div>
          <div className="member-feedback__modal-content member-feedback__modal-loading">
            <h3>Uploading Profile Picture</h3>
            <p>Please wait while we upload your image...</p>
            <div className="member-feedback__upload-progress">
              <div
                className="member-feedback__upload-progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p>{uploadProgress}% Completed</p>
          </div>
        </div>
      )}

      {modalVisible && (
        <div className="member-feedback__modal">
          <div
            className="member-feedback__modal-backdrop"
            onClick={() => setModalVisible(false)}
          ></div>
          <div
            className={`member-feedback__modal-content member-feedback__modal-${modalContent.type}`}
          >
            <h3>{modalContent.type === "success" ? "Thank You!" : "Error"}</h3>
            <p>{modalContent.message}</p>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .share-button {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #1890ff;
          color: white;
          padding: 10px 15px;
          border-radius: 25px;
          display: flex;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .share-button:hover {
          background-color: #40a9ff;
          transform: translateY(-50%) scale(1.05);
        }

        .share-button span {
          margin-left: 8px;
        }

        .share-options-popup {
          position: fixed;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          background-color: white;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .share-options-popup button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .share-options-popup button:hover {
          transform: scale(1.1);
        }

        .member-feedback__loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default ShareExperience;
