import React, { useState, useEffect } from "react";
import styles from "../../../styles/component/_registration.module.scss";

const PersonalInfoStep = ({ formData, handleChange, errors, setErrors }) => {
  // State to track local validation for WhatsApp number
  const [whatsappValidation, setWhatsappValidation] = useState({
    isValid: true,
    message: "",
  });

  // Format date for date input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Handle date change
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name,
        value,
      },
    });
  };

  // Effect to validate WhatsApp number on initial load or when it changes
  useEffect(() => {
    validateWhatsappNumber(formData.whatsappNo);
  }, [formData.whatsappNo]);

  // Validation function for WhatsApp number
  const validateWhatsappNumber = (value) => {
    // Skip validation if empty (will be caught by required field validation)
    if (!value) {
      setWhatsappValidation({
        isValid: true,
        message: "",
      });
      return true;
    }

    // Update parent form's errors if setErrors is available
    if (setErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        // Don't clear required field error if present
        if (newErrors.whatsappNo !== "WhatsApp number is required") {
          delete newErrors.whatsappNo;
        }
        return newErrors;
      });
    }

    // Check for exactly 7 digits
    if (value.length !== 7) {
      setWhatsappValidation({
        isValid: false,
        message: "WhatsApp number must be exactly 7 digits",
      });

      // Update the parent form's errors state
      if (setErrors) {
        setErrors((prev) => ({
          ...prev,
          whatsappNo: "WhatsApp number must be exactly 7 digits",
        }));
      }

      return false;
    }

    // Valid 7-digit number
    setWhatsappValidation({
      isValid: true,
      message: "",
    });

    // Clear the error in parent form if it exists
    if (setErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.whatsappNo;
        return newErrors;
      });
    }
  };

  const handleWhatsappNoChange = (e) => {
    const { value } = e.target;

    // Only allow numbers
    const numericValue = value.replace(/[^\d]/g, "").substring(0, 7);

    handleChange({
      target: {
        name: "whatsappNo",
        value: numericValue,
      },
    });

    // Validation is now handled by the useEffect
  };

  const prefixOptions = [
    { value: "50", label: "50" },
    { value: "52", label: "52" },
    { value: "54", label: "54" },
    { value: "55", label: "55" },
    { value: "56", label: "56" },
    { value: "58", label: "58" },
  ];

  return (
    <div className={styles["wjoinregistration-personal-info-step"]}>
      <h2 className={styles["wjoinregistration-form-section-title"]}>
        Personal Information
      </h2>

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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h3>Tell us about yourself</h3>
        </div>
        <p>
          Please provide your personal details to help us get to know you
          better. This information will be used for your community membership.
        </p>
      </div>

      {/* Name Row */}
      <div className={styles["wjoinregistration-form-row"]}>
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.firstName ? styles["error"] : ""
            }`}
            value={formData.firstName}
            onChange={handleChange}
            maxLength={50}
          />
          {errors.firstName && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.firstName}
            </div>
          )}
        </div>

        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.lastName ? styles["error"] : ""
            }`}
            value={formData.lastName}
            onChange={handleChange}
            maxLength={50}
          />
          {errors.lastName && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      {/* Email Field - Readonly if authenticated */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="email">Email Address</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="email"
            id="email"
            name="email"
            className={styles["wjoinregistration-form-control"]}
            value={formData.email}
            onChange={handleChange}
            disabled={true}
            style={{ borderRadius: "8px 0 0 8px" }}
          />
          <div
            style={{
              backgroundColor: "#388e3c",
              color: "white",
              padding: "12px",
              borderRadius: "0 8px 8px 0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
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
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="whatsappNo">WhatsApp Number</label>
        <div className={styles["wjoinregistration-whatsapp-input-wrapper"]}>
          <div
            className={`${styles["wjoinregistration-whatsapp-input"]} ${
              errors.whatsappNo || !whatsappValidation.isValid
                ? styles["error"]
                : ""
            }`}
          >
            <div className={styles["wjoinregistration-whatsapp-country-code"]}>
              +971
            </div>
            <div
              className={styles["wjoinregistration-whatsapp-prefix-wrapper"]}
            >
              <select
                name="whatsappPrefix"
                className={styles["wjoinregistration-whatsapp-prefix-select"]}
                value={formData.whatsappPrefix}
                onChange={handleChange}
                aria-label="WhatsApp prefix code"
              >
                {prefixOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              id="whatsappNo"
              name="whatsappNo"
              className={styles["wjoinregistration-whatsapp-number-input"]}
              value={formData.whatsappNo}
              onChange={handleWhatsappNoChange}
              maxLength={7}
              placeholder="1234567"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Error message - show either from parent or local validation */}
        {(errors.whatsappNo || !whatsappValidation.isValid) && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.whatsappNo || whatsappValidation.message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#757575" }}>
            Please enter exactly 7 digits. This number will be verified in the
            final step.
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: formData.whatsappNo.length === 7 ? "#388e3c" : "#757575",
            }}
          >
            {formData.whatsappNo.length}/7
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          className={`${styles["wjoinregistration-form-control"]} ${
            errors.dateOfBirth ? styles["error"] : ""
          }`}
          value={formatDateForInput(formData.dateOfBirth)}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.dateOfBirth && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.dateOfBirth}
          </div>
        )}
      </div>

      {/* Professional Info */}
      <div className={styles["wjoinregistration-form-row"]}>
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.company ? styles["error"] : ""
            }`}
            value={formData.company}
            onChange={handleChange}
            maxLength={100}
          />
          {errors.company && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.company}
            </div>
          )}
        </div>

        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.jobTitle ? styles["error"] : ""
            }`}
            value={formData.jobTitle}
            onChange={handleChange}
            maxLength={100}
          />
          {errors.jobTitle && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.jobTitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
