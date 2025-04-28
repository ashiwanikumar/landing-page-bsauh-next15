import React, { useState, useEffect } from "react";
import styles from "../../../styles/component/_registration.module.scss";
import Link from "next/link";

const SuccessMessage = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Only run effects after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-close timer with progress bar
  useEffect(() => {
    if (!isMounted) return;

    const duration = 10000; // 10 seconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / steps;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, interval);

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    // Simulate confetti effect
    fireConfetti();

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose, isMounted]);

  // Fire confetti animation
  const fireConfetti = () => {
    if (typeof window === "undefined") return;

    // This is a simple confetti implementation
    // In a real implementation, you might use a library like canvas-confetti
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    document.body.appendChild(container);

    const colors = ["#336633", "#99CC66", "#f5cc0a", "#ff9933", "#ffffff"];

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = "50%";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "-20px";
        confetti.style.opacity = "0";
        confetti.style.transform = "translateY(0)";
        confetti.style.transition = `transform ${
          Math.random() * 3 + 2
        }s ease-out, opacity 0.5s ease-in`;

        container.appendChild(confetti);

        // Start animation after a small delay
        setTimeout(() => {
          confetti.style.opacity = "1";
          confetti.style.transform = `translateY(${
            window.innerHeight
          }px) rotate(${Math.random() * 360}deg)`;
        }, 10);

        // Remove after animation
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }, Math.random() * 3000); // Stagger the confetti
    }

    // Clean up after all animations
    setTimeout(() => {
      container.remove();
    }, 8000);
  };

  return (
    <div className={styles["wjoinregistration-success-step"]}>
      <div className={styles["wjoinregistration-success-container"]}>
        <div className={styles["wjoinregistration-success-icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
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
        </div>
        <h2 className={styles["wjoinregistration-success-title"]}>
          Registration Successful!
        </h2>
        <p className={styles["wjoinregistration-success-text"]}>
          Thank you for registering with Bihar Samaj UAE. Your application has
          been submitted successfully and is pending review.
        </p>
        <p className={styles["wjoinregistration-success-details"]}>
          We will review your application and contact you soon. Once approved,
          you will receive a confirmation notification.
        </p>
        <div className={styles["wjoinregistration-success-next-steps"]}>
          <h3>What happens next?</h3>
          <ul>
            <li>Our team will review your application</li>
            <li>You'll receive updates via WhatsApp/Email</li>
            <li>
              Once approved, you'll gain access to member benefits and community
              events
            </li>
          </ul>
        </div>
        <div className={styles["wjoinregistration-success-cta"]}>
          <Link href="/" className={styles["wjoinregistration-button-primary"]}>
            Return to Homepage
          </Link>
          <Link
            href="/contact"
            className={styles["wjoinregistration-button-outline"]}
          >
            Contact Support
          </Link>
        </div>
      </div>

      {isMounted && (
        <div className={styles["wjoinregistration-auto-close"]}>
          <p>
            This message will automatically close in{" "}
            {Math.ceil((100 - progress) / 10)} seconds
          </p>
          <div className={styles["wjoinregistration-progress-bar"]}>
            <div
              className={styles["wjoinregistration-progress-bar-fill"]}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;
