import React, { useState, useRef, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import NotificationModal from "../../modal/whatsapp/NotificationModal";
import styles from "../../../styles/component/_registration.module.scss";

const AuthenticationStep = ({
  onAuthSuccess,
  sendRegistrationOTP,
  verifyRegistrationOTP,
  verifyWithGoogle,
}) => {
  // Email authentication states
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});

  // Add a reference for the OTP input
  const otpInputRef = useRef(null);

  // Debugging for Version 0.2.6
  useEffect(() => {
    console.log("Google OAuth Version: 0.2.6");
    console.log(
      "Client ID available:",
      !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    );
    console.log(
      "Client ID first 10 chars:",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.substring(0, 10) + "..."
        : "Not available"
    );
  }, []);

  // Effect to focus the OTP input when modal is shown
  useEffect(() => {
    if (showModal && otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current.focus();
      }, 300); // Short delay to ensure modal is fully rendered
    }
  }, [showModal]);

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      // In older versions, the response structure was different
      const decoded = decodeJwtResponse(credentialResponse.credential);

      // Google data with profile picture
      const googleData = {
        email: decoded.email,
        firstName: decoded.given_name || "",
        lastName: decoded.family_name || "",
        token: credentialResponse.credential, // This is the Google token
        googleId: decoded.sub,
        profilePictureUrl: decoded.picture || "",
      };

      // Call the API to verify with Google and get server's pre-verification token
      try {
        const verifyResponse = await verifyWithGoogle(googleData);

        // Extract the pre-verification token from the server response
        const serverToken = verifyResponse.data.token;

        // Update form data with server token and Google profile information
        const authData = {
          ...googleData,
          token: serverToken, // Replace Google token with server token
          googleAuth: true,
          isEmailVerified: true,
        };

        // Call the success handler with the authenticated data including server token
        onAuthSuccess("google", authData);
      } catch (apiError) {
        console.error("Google verification API error:", apiError);
        setError("Failed to verify Google credentials with server");
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to authenticate with Google. Please try again.");
      console.error("Google auth error:", error);
      setLoading(false);
    }
  };

  // Decode JWT token from Google
  const decodeJwtResponse = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    setError("Google sign-in failed. Please try again or use email.");
    console.error("Google sign-in error:", error);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  // Send OTP to email
  const handleSendOtp = async () => {
    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      // Log the request for debugging
      console.log("Sending OTP to email:", email);

      // Start countdown immediately before API call
      setCountdown(60);

      // Show loading modal with better styling
      setModalProps({
        type: "info",
        title: "Sending Verification Code",
        message: (
          <div className={styles["wjoinnotification-loading-message"]}>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Sending verification code to:
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "18px",
                color: "#336633",
                background: "#f5f5f5",
                padding: "10px 15px",
                borderRadius: "6px",
              }}
            >
              {email}
            </p>
          </div>
        ),
        actionButton: null,
      });
      setShowModal(true);

      setLoading(true);
      setError("");

      // Send OTP to the provided email
      const response = await sendRegistrationOTP({ email });
      console.log("OTP send response:", response);

      // Check if user is already registered
      if (response.data && response.data.isExistingUser) {
        console.log("User already exists:", email);

        // Show already registered modal
        setModalProps({
          type: "warning",
          title: "Account Already Exists",
          message: (
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                This email is already registered:
              </p>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "#d32f2f",
                  background: "#ffebee",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                }}
              >
                {email}
              </p>
              <p>
                Please use a different email address or sign in with your
                existing account.
              </p>
            </div>
          ),
          duration: 0,
          actionButtonText: "Close",
        });
        setLoading(false);
        return;
      }

      // Show OTP input modal
      showOtpInputModal();

      setLoading(false);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      console.error(
        "Error details:",
        error.response?.data?.message || "Unknown error"
      );

      setError(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );

      // Show error modal
      setModalProps({
        type: "error",
        title: "Failed to Send Code",
        message: (
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              We couldn't send the verification code to:
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "17px",
                color: "#d32f2f",
                background: "#ffebee",
                padding: "10px 15px",
                borderRadius: "6px",
                marginBottom: "15px",
              }}
            >
              {email}
            </p>
            <p>Please check your email address and try again.</p>
          </div>
        ),
        duration: 5000,
        actionButtonText: "Close",
      });
      setShowModal(true);

      setLoading(false);
    }
  };

  // Implement a Dedicated Button Component in Modal
  const VerifyButton = ({ localOtp }) => (
    <button
      type="button"
      className={styles["modal-action-button"]}
      onClick={() => handleVerifyOtp(localOtp)}
      disabled={localOtp.length !== 6 || loading}
      style={{
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: "600",
        background: localOtp.length !== 6 || loading ? "#a5c6a5" : "#336633",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: localOtp.length !== 6 || loading ? "not-allowed" : "pointer",
        marginTop: "16px",
        marginBottom: "0",
      }}
    >
      {loading ? (
        <span>
          <span className={styles["spinner-indicator"]}></span> Verifying...
        </span>
      ) : (
        "Verify Code"
      )}
    </button>
  );

  // ErrorVerifyButton - similar to VerifyButton but with error styling
  const ErrorVerifyButton = ({ localOtp }) => (
    <button
      type="button"
      className={styles["modal-action-button"]}
      onClick={() => handleVerifyOtp(localOtp)}
      disabled={localOtp.length !== 6 || loading}
      style={{
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: "600",
        background: "#d32f2f",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: localOtp.length !== 6 || loading ? "not-allowed" : "pointer",
        opacity: localOtp.length !== 6 || loading ? 0.7 : 1,
        marginTop: "16px",
      }}
    >
      Try Again
    </button>
  );

  // New function to show OTP input modal
  const showOtpInputModal = () => {
    // Create a wrapping component that manages its own state
    const OtpVerificationContent = () => {
      // Initialize with empty string instead of parent state
      const [localOtp, setLocalOtp] = useState("");
      const [localCountdown, setLocalCountdown] = useState(60);

      // Set up the countdown timer
      useEffect(() => {
        let timerId = null;
        if (localCountdown > 0) {
          timerId = setInterval(() => {
            setLocalCountdown((prev) => prev - 1);
          }, 1000);
        }

        return () => {
          if (timerId) clearInterval(timerId);
        };
      }, [localCountdown]);

      // Update parent state when local state changes
      useEffect(() => {
        setOtp(localOtp);
      }, [localOtp]);

      return (
        <div style={{ margin: 0, padding: 0 }}>
          <div
            className={styles["otp-modal-content"]}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              We've sent a verification code to:
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "17px",
                color: "#336633",
                background: "#f0f7f0",
                padding: "10px 15px",
                borderRadius: "6px",
                marginBottom: "20px",
              }}
            >
              {email}
            </p>

            <div style={{ margin: "24px 0 16px" }}>
              <div style={{ textAlign: "left", marginBottom: "8px" }}>
                <label
                  htmlFor="modal-otp-input"
                  style={{ fontSize: "15px", fontWeight: "500" }}
                >
                  Enter verification code:
                </label>
              </div>
              <input
                id="modal-otp-input"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                className={styles["form-control"]}
                placeholder="Enter 6-digit code"
                maxLength={6}
                value={localOtp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setLocalOtp(value);
                }}
                style={{
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontSize: "20px",
                  padding: "15px",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1) inset",
                  outline: "none",
                  pointerEvents: "auto",
                  zIndex: 1060,
                }}
              />
            </div>

            <div style={{ textAlign: "center", margin: "18px 0 8px" }}>
              {localCountdown > 0 ? (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    fontWeight: "500",
                    background: "#f5f5f5",
                    padding: "10px 15px",
                    borderRadius: "6px",
                    display: "inline-block",
                  }}
                >
                  Resend code in{" "}
                  <span style={{ fontWeight: "bold", color: "#336633" }}>
                    {localCountdown}
                  </span>{" "}
                  seconds
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLocalCountdown(60);
                    handleSendOtp();
                  }}
                  disabled={loading || localCountdown > 0}
                  style={{
                    background: "#f0f7f0",
                    border: "none",
                    color: "#336633",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  Resend verification code
                </button>
              )}
            </div>
          </div>
          <VerifyButton localOtp={localOtp} />
        </div>
      );
    };

    setModalProps({
      type: "success",
      title: "Enter Verification Code",
      message: <OtpVerificationContent />,
      actionButton: null,
      actionButtonText: null,
      width: "440px",
      customClass: "otp-verification-modal",
    });
    setShowModal(true);
  };

  // Start countdown timer for OTP resend
  const startCountdown = () => {
    if (!isMounted) return () => {};

    setCountdownActive(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setCountdownActive(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  };

  // Add effect to manage countdown
  useEffect(() => {
    let timerId;
    if (showModal && !otpVerified) {
      timerId = startCountdown();
    }

    return () => {
      if (timerId) {
        timerId();
      }
    };
  }, [showModal, otpVerified, isMounted]);

  // Verify the entered OTP
  const handleVerifyOtp = async (explicitOtp = null) => {
    // Use the explicit OTP if provided, otherwise fall back to state
    const otpValue = explicitOtp || String(otp).trim();

    console.log("Attempting to verify OTP:", {
      email: email,
      otpValue: otpValue,
      otpLength: otpValue.length,
      isValidFormat: /^\d{6}$/.test(otpValue),
    });

    if (!otpValue || otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      // Create an error modal with button
      const ErrorOtpModalWithButton = () => {
        // Initialize with empty string instead of parent state
        const [localOtp, setLocalOtp] = useState("");

        // Get current countdown from parent state
        const currentCountdown = countdown;

        // Update parent state when local state changes
        useEffect(() => {
          setOtp(localOtp);
        }, [localOtp]);

        return (
          <div style={{ margin: 0, padding: 0 }}>
            {" "}
            {/* Wrapper with no margins */}
            <div
              className={styles["wjoinnotification-otp-modal-content"]}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  color: "#d32f2f",
                  fontWeight: "500",
                  fontSize: "15px",
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  padding: "12px 15px",
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
              >
                Please enter a valid 6-digit verification code
              </div>

              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                Enter the verification code sent to:
              </p>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "#336633",
                  background: "#f0f7f0",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
              >
                {email}
              </p>

              <div style={{ margin: "24px 0 16px" }}>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus
                  className={styles["form-control"]}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={localOtp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setLocalOtp(value);
                  }}
                  style={{
                    textAlign: "center",
                    letterSpacing: "8px",
                    fontSize: "20px",
                    padding: "15px",
                    width: "100%",
                    border: "1px solid #d32f2f",
                    borderRadius: "6px",
                    boxShadow: "0 1px 3px rgba(211, 47, 47, 0.2) inset",
                    outline: "none",
                    pointerEvents: "auto",
                    zIndex: 1060,
                  }}
                />
              </div>

              <div style={{ textAlign: "center", margin: "18px 0 8px" }}>
                {currentCountdown > 0 ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      fontWeight: "500",
                      background: "#f5f5f5",
                      padding: "10px 15px",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    Resend code in{" "}
                    <span style={{ fontWeight: "bold", color: "#336633" }}>
                      {currentCountdown}
                    </span>{" "}
                    seconds
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(60);
                      handleSendOtp();
                    }}
                    disabled={loading || currentCountdown > 0}
                    style={{
                      background: "#f0f7f0",
                      border: "none",
                      color: "#336633",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </div>
            <ErrorVerifyButton localOtp={localOtp} />
          </div>
        );
      };

      // Show error message in the modal
      setModalProps({
        type: "error",
        title: "Verification Error",
        message: <ErrorOtpModalWithButton />,
        actionButton: null,
        actionButtonText: null,
        width: "440px", // Control the width
        customClass: "otp-verification-error-modal", // Add custom class
      });
      return;
    }

    try {
      // Update modal to show verification in progress
      setModalProps({
        ...modalProps,
        type: "info",
        title: "Verifying Your Code",
        message: (
          <div className={styles["wjoinnotification-loading-message"]}>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                color: "#333",
                marginBottom: "15px",
              }}
            >
              Please wait while we verify your code...
            </p>
            <div className={styles["wjoinnotification-loading-spinner"]}>
              <div className={styles["wjoinnotification-spinner"]}></div>
            </div>
          </div>
        ),
        actionButton: null,
      });

      setLoading(true);
      setError("");

      // Log before API call
      console.log("Sending verification request with:", {
        email,
        otp: otpValue,
      });

      // Make sure we're passing both email and otp to the API
      const response = await verifyRegistrationOTP({
        email: email,
        otp: otpValue,
      });

      // Log the complete response
      console.log("Verification API response:", response);
      console.log("Response data:", response.data);

      // Check if response contains token and handle accordingly
      if (response && response.data && response.data.token) {
        setOtpVerified(true);

        // Show success modal
        setModalProps({
          type: "success",
          title: "Verification Successful",
          message: (
            <div
              className={styles["verification-success-message"]}
              style={{ textAlign: "center", padding: "15px 0" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#388e3c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ margin: "0 auto 20px" }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#388e3c",
                  marginBottom: "12px",
                }}
              >
                Email Verified Successfully!
              </p>
              <p style={{ fontSize: "16px", color: "#555" }}>
                You can now proceed with your registration.
              </p>
            </div>
          ),
          duration: 3000,
          actionButtonText: "Continue",
        });

        // Important: Capture the server token from the response
        const serverToken = response.data.token;

        // Call the success handler with the authenticated data
        onAuthSuccess("email", {
          email: email,
          otp: response.data.otpId,
          token: serverToken,
          isEmailVerified: true,
          googleAuth: false,
        });
      } else {
        throw new Error("Invalid response from server");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      // Enhanced error logging
      console.error("Verification error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      // Extract the specific error message from the response
      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired code. Please try again.";

      // Create an error modal with button for API errors
      const ErrorOtpModalWithButton = () => {
        // Initialize with empty string instead of parent state
        const [localOtp, setLocalOtp] = useState("");

        // Get current countdown from parent state
        const currentCountdown = countdown;

        // Update parent state when local state changes
        useEffect(() => {
          setOtp(localOtp);
        }, [localOtp]);

        return (
          <div style={{ margin: 0, padding: 0 }}>
            {" "}
            {/* Wrapper with no margins */}
            <div
              className={styles["wjoinnotification-otp-modal-content"]}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  color: "#d32f2f",
                  fontWeight: "500",
                  fontSize: "15px",
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  padding: "12px 15px",
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
              >
                {errorMessage}
              </div>

              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                Enter the verification code sent to:
              </p>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "#336633",
                  background: "#f0f7f0",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
              >
                {email}
              </p>

              <div style={{ margin: "24px 0 16px" }}>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus
                  className={styles["form-control"]}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={localOtp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setLocalOtp(value);
                  }}
                  style={{
                    textAlign: "center",
                    letterSpacing: "8px",
                    fontSize: "20px",
                    padding: "15px",
                    width: "100%",
                    border: "1px solid #d32f2f",
                    borderRadius: "6px",
                    boxShadow: "0 1px 3px rgba(211, 47, 47, 0.2) inset",
                    outline: "none",
                    pointerEvents: "auto",
                    zIndex: 1060,
                  }}
                />
              </div>

              <div style={{ textAlign: "center", margin: "18px 0 8px" }}>
                {currentCountdown > 0 ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      fontWeight: "500",
                      background: "#f5f5f5",
                      padding: "10px 15px",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    Resend code in{" "}
                    <span style={{ fontWeight: "bold", color: "#336633" }}>
                      {currentCountdown}
                    </span>{" "}
                    seconds
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(60);
                      handleSendOtp();
                    }}
                    disabled={loading || currentCountdown > 0}
                    style={{
                      background: "#f0f7f0",
                      border: "none",
                      color: "#336633",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </div>
            <ErrorVerifyButton localOtp={localOtp} />
          </div>
        );
      };

      // Show error in modal
      setModalProps({
        type: "error",
        title: "Verification Failed",
        message: <ErrorOtpModalWithButton />,
        actionButton: null,
        actionButtonText: null,
        width: "440px", // Control the width
        customClass: "otp-verification-error-modal", // Add custom class
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles["wjoinregistration-auth-step"]}>
      <h2 className={styles["wjoinregistration-form-section-title"]}>
        Choose how you'd like to register
      </h2>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        {...modalProps}
      />

      <div className={styles["wjoinregistration-info-box"]}>
        <div className={styles["wjoinregistration-info-icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <h3>Getting Started</h3>
        </div>
        <p>
          Select your preferred authentication method to begin the registration
          process. You can sign in with your Google account for a quicker setup,
          or use your email address with OTP verification.
        </p>
        <p
          style={{
            marginTop: "15px",
            fontStyle: "italic",
            fontSize: "14px",
            color: "#555",
          }}
        >
          Need help? Contact us at{" "}
          <a
            href="mailto:support@biharsamajabudhabi.com"
            style={{
              color: "#336633",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            support@biharsamajabudhabi.com
          </a>
        </p>
      </div>

      {error && (
        <div className={styles["wjoinregistration-error-message"]}>{error}</div>
      )}

      <div className={styles["wjoinregistration-auth-options"]}>
        {/* Google Authentication Option */}
        <div
          className={styles["wjoinregistration-auth-option"]}
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <div
            className={
              styles["wjoinregistration-auth-icon"] +
              " " +
              styles["wjoinregistration-google-icon"]
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          <h3>Sign in with Google</h3>
          <p>
            Use your Google account for a faster registration process with fewer
            steps.
          </p>

          <div
            className={styles["wjoinregistration-google-login-button"]}
            style={{ marginTop: "20px" }}
          >
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
              buttonText="Sign in with Google"
            />
          </div>
        </div>

        {/* Email Authentication Option */}
        <div
          className={styles["wjoinregistration-auth-option"]}
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <div
            className={
              styles["wjoinregistration-auth-icon"] +
              " " +
              styles["wjoinregistration-email-icon"]
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#336633"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>Sign in with Email</h3>
          <p>Use your email address to receive a one-time verification code.</p>

          {!showOtpInput || showModal ? (
            // Show email input form when not in OTP input mode or when modal is open
            <div
              className={styles["wjoinregistration-email-auth-form"]}
              style={{ marginTop: "20px" }}
            >
              <div className={styles["wjoinregistration-form-group"]}>
                <input
                  type="email"
                  className={styles["wjoinregistration-form-control"]}
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                className={styles["wjoinregistration-btn-primary"]}
                onClick={handleSendOtp}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
          ) : otpVerified ? (
            // Show success message when OTP is verified
            <div className={styles["wjoinregistration-verification-success"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#388e3c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 style={{ color: "var(--success)", marginTop: "15px" }}>
                Email Verified!
              </h3>
              <p>You can proceed to the next step.</p>
            </div>
          ) : (
            // Only show the OTP verification section when not using modal
            <div
              className={styles["wjoinregistration-otp-verification"]}
              style={{ marginTop: "20px" }}
            >
              <p>
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>

              <input
                type="text"
                className={styles["wjoinregistration-form-control"]}
                placeholder="Enter verification code"
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                style={{
                  textAlign: "center",
                  letterSpacing: "3px",
                  fontSize: "18px",
                  pointerEvents: "auto",
                  zIndex: 1060,
                }}
              />

              <div
                className={styles["wjoinregistration-otp-actions"]}
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  className={styles["wjoinregistration-btn-primary"]}
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>

                <div className={styles["wjoinregistration-otp-timer"]}>
                  {countdown > 0 ? (
                    <span>Resend code in {countdown} seconds</span>
                  ) : (
                    <button
                      type="button"
                      className={styles["wjoinregistration-resend-otp"]}
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      Resend verification code
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationStep;
