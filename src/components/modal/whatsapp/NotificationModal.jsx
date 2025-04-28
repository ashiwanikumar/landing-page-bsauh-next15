import React, { useState, useEffect } from "react";
import styles from "./NotificationModal.module.scss";

const NotificationModal = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  duration = 0,
  actionButton = null,
  actionButtonText = "Close",
  width = "480px",
  customClass = "",
}) => {
  const [countdown, setCountdown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Client-side only effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle animation states
  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  // Handle auto-close functionality
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    if (duration > 0) {
      setCountdown(Math.floor(duration / 1000));
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newProgress = (currentStep / steps) * 100;
        setProgress(newProgress);

        if (currentStep % 20 === 0) {
          setCountdown(Math.ceil((duration - currentStep * interval) / 1000));
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          onClose();
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isOpen, duration, onClose, isMounted]);

  if (!isOpen && !isVisible) return null;

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case "warning":
        return (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "info":
        // For info type with actionButton null and title contains "Sending", show enhanced loading spinner
        if (actionButton === null && title && title.includes("Sending")) {
          return (
            <div className={styles["wjoinnotification-sending-spinner"]}>
              <div className={styles["wjoinnotification-spinner-container"]}>
                <div className={styles["wjoinnotification-spinner"]}></div>
              </div>
            </div>
          );
        }

        // For info type with actionButton null (other loading states)
        if (actionButton === null) {
          return (
            <div className={styles["wjoinnotification-loading-spinner"]}>
              <div className={styles["wjoinnotification-spinner"]}></div>
            </div>
          );
        }
        // Otherwise show standard info icon
        return (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
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
        );
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
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
        );
    }
  };

  // Check if the modal contains an OTP resend functionality
  const hasResendOtp =
    typeof message === "object" &&
    React.isValidElement(message) &&
    message.props?.children?.some?.(
      (child) =>
        React.isValidElement(child) &&
        child.props?.children?.toString().includes("Resend verification code")
    );

  return (
    <div
      className={`${styles["wjoinnotification-modal-overlay"]} ${
        isOpen ? styles["is-open"] : styles["is-closing"]
      }`}
    >
      <div
        className={`${styles["wjoinnotification-modal-card"]} ${styles[type]} ${
          isOpen ? styles["is-open"] : styles["is-closing"]
        } ${customClass} ${
          title && title.includes("Sending") ? styles["sending-mode"] : ""
        }`}
        style={{ maxWidth: width }}
      >
        <button
          className={styles["wjoinnotification-modal-close-btn"]}
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles["wjoinnotification-modal-content"]}>
          <div className={styles["wjoinnotification-modal-header"]}>
            <div
              className={`${styles["wjoinnotification-modal-icon-circle"]} ${
                styles[type]
              } ${
                title && title.includes("Sending")
                  ? styles["sending-animation"]
                  : ""
              }`}
            >
              {getIcon()}
            </div>
            <h2 className={styles["wjoinnotification-modal-title"]}>{title}</h2>
          </div>

          <div className={styles["wjoinnotification-modal-body"]}>
            {message}
          </div>

          {actionButton && (
            <button
              className={styles["wjoinnotification-modal-action-button"]}
              onClick={actionButton}
            >
              {actionButtonText}
            </button>
          )}

          {isMounted && duration > 0 && (
            <div
              className={styles["wjoinnotification-modal-progress-container"]}
            >
              <div className={styles["wjoinnotification-modal-progress-bar"]}>
                <div
                  className={styles["wjoinnotification-modal-progress-fill"]}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={styles["wjoinnotification-modal-countdown-text"]}>
                Closing in {countdown} {countdown === 1 ? "second" : "seconds"}
              </p>
            </div>
          )}

          {isMounted && hasResendOtp && (
            <div className={styles["wjoinnotification-otp-timer-container"]}>
              <div className={styles["wjoinnotification-otp-countdown-ring"]}>
                <svg width="60" height="60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    strokeWidth="3"
                    className={
                      styles["wjoinnotification-otp-countdown-background"]
                    }
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    strokeWidth="3"
                    strokeDashoffset="0"
                    className={
                      styles["wjoinnotification-otp-countdown-progress"]
                    }
                    transform="rotate(-90, 30, 30)"
                  />
                </svg>
                <span
                  className={styles["wjoinnotification-otp-countdown-seconds"]}
                ></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationModal);
