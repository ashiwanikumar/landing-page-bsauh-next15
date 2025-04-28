import React, { useState, useEffect } from "react";
import styles from "../../../styles/component/_registration.module.scss";
import statesWithCitiesData from "../../../data/states.json";

const PermanentAddressStep = ({
  formData,
  handleChange,
  errors,
  setErrors, // Added parameter to receive the setErrors function
  states,
  setStates,
  cities,
  setCities,
}) => {
  // Local state for emergency contact validation
  const [emergencyContactValidation, setEmergencyContactValidation] = useState({
    isValid: true,
    message: "",
  });

  useEffect(() => {
    // Initialize states from states.json
    const statesData = Object.keys(statesWithCitiesData);
    setStates(statesData);

    // If Bihar is selected by default, load its cities
    if (formData.permAddressState === "Bihar") {
      setCities(statesWithCitiesData["Bihar"] || []);
    }
  }, []);

  // Add effect to validate emergency contact when it changes
  useEffect(() => {
    validateEmergencyContact(formData.emergencyContact);
  }, [formData.emergencyContact]);

  const validateEmergencyContact = (value) => {
    // Skip validation if empty (will be caught by required field validation)
    if (!value) {
      setEmergencyContactValidation({
        isValid: true,
        message: "",
      });

      // Update parent form's errors if setErrors is available
      if (setErrors) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          // Don't clear required field error if present
          if (newErrors.emergencyContact !== "Emergency contact is required") {
            delete newErrors.emergencyContact;
          }
          return newErrors;
        });
      }

      return;
    }

    // Validate for exactly 10 digits
    if (value.length !== 10) {
      setEmergencyContactValidation({
        isValid: false,
        message: "Emergency contact must be exactly 10 digits",
      });

      // Update parent form's errors
      if (setErrors) {
        setErrors((prev) => ({
          ...prev,
          emergencyContact: "Emergency contact must be exactly 10 digits",
        }));
      }

      return;
    }

    // Valid 10-digit number
    setEmergencyContactValidation({
      isValid: true,
      message: "",
    });

    // Clear error in parent form
    if (setErrors) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.emergencyContact;
        return newErrors;
      });
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;

    // Update form state
    handleChange({
      target: {
        name: "permAddressState",
        value: state,
      },
    });

    // Update city dropdown based on selected state
    handleChange({
      target: {
        name: "permAddressCity",
        value: "",
      },
    });

    // Load cities for the selected state
    setCities(statesWithCitiesData[state] || []);
  };

  const handleEmergencyContactChange = (e) => {
    const { value } = e.target;

    // Only allow up to 10 digits
    const cleanedNumber = value.replace(/\D/g, "").substring(0, 10);

    // Save just the digits in form state (without +91 prefix)
    handleChange({
      target: {
        name: "emergencyContact",
        value: cleanedNumber,
      },
    });

    // Validation will be handled by the useEffect
  };

  return (
    <div className={styles["wjoinregistration-permanent-address-step"]}>
      <h2 className={styles["wjoinregistration-form-section-title"]}>
        Permanent Address
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <h3>Your Permanent Address in India</h3>
        </div>
        <p>
          Please provide your permanent address in India. This information helps
          us connect you with others from your region and maintain accurate
          community records.
        </p>
      </div>

      {/* Country - Fixed as India */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="permAddressCountry">Country</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            id="permAddressCountry"
            name="permAddressCountry"
            className={styles["wjoinregistration-form-control"]}
            value={`${formData.permAddressCountry} 🇮🇳`}
            disabled={true}
          />
        </div>
      </div>

      {/* State & City */}
      <div className={styles["wjoinregistration-form-row"]}>
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="permAddressState">State</label>
          <div className={styles["wjoinregistration-select-wrapper"]}>
            <select
              id="permAddressState"
              name="permAddressState"
              className={`${styles["wjoinregistration-form-control"]} ${
                errors.permAddressState ? styles["error"] : ""
              }`}
              value={formData.permAddressState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {errors.permAddressState && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.permAddressState}
            </div>
          )}
        </div>

        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="permAddressCity">City/District</label>
          <div className={styles["wjoinregistration-select-wrapper"]}>
            <select
              id="permAddressCity"
              name="permAddressCity"
              className={`${styles["wjoinregistration-form-control"]} ${
                errors.permAddressCity ? styles["error"] : ""
              }`}
              value={formData.permAddressCity}
              onChange={handleChange}
              disabled={!formData.permAddressState}
            >
              <option value="">Select City/District</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {errors.permAddressCity && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.permAddressCity}
            </div>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="permAddressStreet">Street Address</label>
        <textarea
          id="permAddressStreet"
          name="permAddressStreet"
          className={`${styles["wjoinregistration-form-control"]} ${
            errors.permAddressStreet ? styles["error"] : ""
          }`}
          value={formData.permAddressStreet}
          onChange={handleChange}
          rows={3}
        ></textarea>
        {errors.permAddressStreet && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.permAddressStreet}
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="emergencyContact">
          Emergency Contact Number (in India)
        </label>
        <div className={styles["wjoinregistration-phone-input-wrapper"]}>
          <div
            className={`${styles["wjoinregistration-phone-input"]} ${
              errors.emergencyContact || !emergencyContactValidation.isValid
                ? styles["error"]
                : ""
            }`}
          >
            <div className={styles["wjoinregistration-phone-prefix"]}>+91</div>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              className={styles["wjoinregistration-phone-number-input"]}
              value={formData.emergencyContact}
              onChange={handleEmergencyContactChange}
              placeholder="XXXXXXXXXX"
              maxLength={10}
              inputMode="numeric"
              aria-describedby="emergencyContactHint emergencyContactError"
            />
          </div>
        </div>

        {/* Error message - show either from parent or local validation */}
        {(errors.emergencyContact || !emergencyContactValidation.isValid) && (
          <div
            className={styles["wjoinregistration-error-text"]}
            id="emergencyContactError"
          >
            {errors.emergencyContact || emergencyContactValidation.message}
          </div>
        )}

        {/* Digit counter and helper text */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <div
            id="emergencyContactHint"
            style={{ fontSize: "12px", color: "#757575" }}
          >
            Please provide a contact number (10 digits) of a family member or
            relative in India.
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color:
                formData.emergencyContact.length === 10 ? "#388e3c" : "#757575",
            }}
          >
            {formData.emergencyContact.length}/10
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermanentAddressStep;
