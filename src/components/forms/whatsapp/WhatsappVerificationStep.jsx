import React, { useState, useEffect } from "react";
import styles from "../../../styles/component/_registration.module.scss";

const WhatsappVerificationStep = ({
  formData,
  onVerificationSuccess,
  sendWhatsappOTP,
  verifyWhatsappOTP,
  countryCode,
  onOtpSent,
}) => {
  // Component states
  const [step, setStep] = useState(0); // 0: initial, 1: OTP sent, 2: verified
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Format phone number for display
  const getFormattedPhoneNumber = () => {
    return `${countryCode} ${formData.whatsappPrefix}${formData.whatsappNo}`;
  };

  // Format phone number for API calls - no spaces
  const getApiPhoneNumber = () => {
    return `${countryCode}${formData.whatsappPrefix}${formData.whatsappNo}`.replace(
      /\s+/g,
      ""
    );
  };

  // Start countdown timer after OTP is sent
  useEffect(() => {
    if (!isMounted) return;

    let timerId;
    if (countdown > 0) {
      timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [countdown, isMounted]);

  // Send OTP to WhatsApp
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      const phoneNumber = getApiPhoneNumber();

      // Call API to send WhatsApp OTP
      await sendWhatsappOTP({
        phoneNumber,
        email: formData.email,
      });

      setStep(1);
      setCountdown(60); // Start 60-second countdown for resend
      setLoading(false);

      // Show notification via props if available
      if (typeof onOtpSent === "function") {
        onOtpSent();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to send verification code. Please try again."
      );
      setLoading(false);
    }
  };

  // Verify OTP received on WhatsApp
  const handleVerifyOtp = async () => {
    // Ensure otp is a string and has 6 digits
    const otpValue = String(otp).trim();

    if (!otpValue || otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const phoneNumber = getApiPhoneNumber();

      // Call API to verify WhatsApp OTP
      const response = await verifyWhatsappOTP({
        phoneNumber,
        email: formData.email,
        otp: otpValue,
      });

      setStep(2);
      // Call the parent callback to update main form state
      onVerificationSuccess(response.data.otpId);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid verification code. Please try again."
      );
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
    setError("");
  };

  // Format time remaining for display
  const formatTimeRemaining = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles["wjoinregistration-whatsapp-step"]}>
      <h2 className={styles["wjoinregistration-heading"]}>
        Verify your Whatsapp
      </h2>
      <p className={styles["wjoinregistration-subheading"]}>
        We've sent a verification code to your WhatsApp number. Please enter it
        below.
      </p>

      <div className={styles["wjoinregistration-form-group"]}>
        <label
          className={styles["wjoinregistration-form-label"]}
          htmlFor="whatsappOtp"
        >
          OTP Code
        </label>
        <input
          type="text"
          id="whatsappOtp"
          name="whatsappOtp"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter 6-digit code"
          className={
            error
              ? styles["wjoinregistration-form-input-error"]
              : styles["wjoinregistration-form-input"]
          }
          maxLength={6}
          disabled={step === 2}
        />
        {error && (
          <div className={styles["wjoinregistration-form-error"]}>{error}</div>
        )}
        {step === 2 && (
          <div className={styles["wjoinregistration-verified-badge"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Verified
          </div>
        )}

        {step === 1 && isMounted && (
          <div className={styles["wjoinregistration-resend-timer"]}>
            {countdown > 0 ? (
              <p>Resend code in {formatTimeRemaining(countdown)}</p>
            ) : (
              <button
                type="button"
                className={styles["wjoinregistration-resend-button"]}
                onClick={handleSendOtp}
                disabled={loading}
              >
                Resend Code
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles["wjoinregistration-button-group"]}>
        <button
          type="button"
          className={styles["wjoinregistration-btn-secondary"]}
          onClick={() => {}} // This does nothing since we're just showing a success state
        >
          Back
        </button>
        {step !== 2 && (
          <button
            type="button"
            className={styles["wjoinregistration-btn-primary"]}
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6}
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default WhatsappVerificationStep;
