import React, { useState, useEffect } from "react";
import styles from "../../../styles/component/_registration.module.scss";

const PresentAddressStep = ({ formData, handleChange, errors }) => {
  // State to control conditional fields visibility
  const [showCommunityMemberField, setShowCommunityMemberField] =
    useState(false);
  const [showOtherReferralField, setShowOtherReferralField] = useState(false);

  // Update visibility of conditional fields when referral source changes
  useEffect(() => {
    setShowCommunityMemberField(formData.referralSource === "Community Member");
    setShowOtherReferralField(formData.referralSource === "Other");
  }, [formData.referralSource]);

  // Handle years in UAE input - only allow numbers
  const handleYearsInUAEChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,2}$/.test(value)) {
      handleChange({
        target: {
          name: "yearsInUAE",
          value,
        },
      });
    }
  };

  // Handle referral source change
  const handleReferralSourceChange = (e) => {
    const { value } = e.target;
    handleChange({
      target: {
        name: "referralSource",
        value,
      },
    });

    // Clear conditional fields when changing referral source
    if (value !== "Community Member") {
      handleChange({
        target: {
          name: "communityMemberName",
          value: "",
        },
      });
    }

    if (value !== "Other") {
      handleChange({
        target: {
          name: "otherReferralSource",
          value: "",
        },
      });
    }
  };

  // Emirates options
  const emiratesOptions = [
    { value: "", label: "Select Emirate" },
    { value: "Abu Dhabi", label: "Abu Dhabi" },
    { value: "Dubai", label: "Dubai" },
    { value: "Sharjah", label: "Sharjah" },
    { value: "Ajman", label: "Ajman" },
    { value: "Umm Al Quwain", label: "Umm Al Quwain" },
    { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
    { value: "Fujairah", label: "Fujairah" },
  ];

  // Referral source options
  const referralOptions = [
    { value: "", label: "Select Option" },
    { value: "Facebook", label: "Facebook" },
    { value: "Instagram", label: "Instagram" },
    { value: "Twitter", label: "Twitter" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Online Thread", label: "Online Thread" },
    { value: "Community Member", label: "Community Member" },
    { value: "Other", label: "Other" },
  ];

  // Staying status options
  const stayingStatusOptions = [
    { value: "", label: "Select Option" },
    { value: "Family", label: "Family" },
    { value: "Single", label: "Single" },
  ];

  return (
    <div className={styles["wjoinregistration-present-address-step"]}>
      <h2 className={styles["wjoinregistration-form-section-title"]}>
        Present Address
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
          <h3>Your Current Address</h3>
        </div>
        <p>
          Please provide your current place of residence. This helps us keep our
          community records up-to-date and tailor information specific to
          Bihari/Jharkhandis in your region.
        </p>
      </div>

      {/* Country Selection */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="presAddressCountry">Country</label>
        <div className={styles["wjoinregistration-select-wrapper"]}>
          <select
            id="presAddressCountry"
            name="presAddressCountry"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.presAddressCountry ? styles["error"] : ""
            }`}
            value={formData.presAddressCountry}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name} {country.flag}
              </option>
            ))}
          </select>
        </div>
        {errors.presAddressCountry && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.presAddressCountry}
          </div>
        )}
      </div>

      {/* For India specific fields */}
      {formData.presAddressCountry === "India" && (
        <>
          <div className={styles["wjoinregistration-form-row"]}>
            <div className={styles["wjoinregistration-form-group"]}>
              <label htmlFor="presAddressState">State</label>
              <div className={styles["wjoinregistration-select-wrapper"]}>
                <select
                  id="presAddressState"
                  name="presAddressState"
                  className={`${styles["wjoinregistration-form-control"]} ${
                    errors.presAddressState ? styles["error"] : ""
                  }`}
                  value={formData.presAddressState}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {indiaStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {errors.presAddressState && (
                <div className={styles["wjoinregistration-error-text"]}>
                  {errors.presAddressState}
                </div>
              )}
            </div>

            <div className={styles["wjoinregistration-form-group"]}>
              <label htmlFor="presAddressCity">City/District</label>
              <div className={styles["wjoinregistration-select-wrapper"]}>
                <select
                  id="presAddressCity"
                  name="presAddressCity"
                  className={`${styles["wjoinregistration-form-control"]} ${
                    errors.presAddressCity ? styles["error"] : ""
                  }`}
                  value={formData.presAddressCity}
                  onChange={handleChange}
                  disabled={!formData.presAddressState}
                >
                  <option value="">Select City/District</option>
                  {indiaCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {errors.presAddressCity && (
                <div className={styles["wjoinregistration-error-text"]}>
                  {errors.presAddressCity}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* For non-India fields */}
      {formData.presAddressCountry &&
        formData.presAddressCountry !== "India" && (
          <>
            <div className={styles["wjoinregistration-form-row"]}>
              <div className={styles["wjoinregistration-form-group"]}>
                <label htmlFor="presAddressState">State/Province/Region</label>
                <input
                  type="text"
                  id="presAddressState"
                  name="presAddressState"
                  className={`${styles["wjoinregistration-form-control"]} ${
                    errors.presAddressState ? styles["error"] : ""
                  }`}
                  value={formData.presAddressState}
                  onChange={handleChange}
                />
                {errors.presAddressState && (
                  <div className={styles["wjoinregistration-error-text"]}>
                    {errors.presAddressState}
                  </div>
                )}
              </div>

              <div className={styles["wjoinregistration-form-group"]}>
                <label htmlFor="presAddressCity">City</label>
                <input
                  type="text"
                  id="presAddressCity"
                  name="presAddressCity"
                  className={`${styles["wjoinregistration-form-control"]} ${
                    errors.presAddressCity ? styles["error"] : ""
                  }`}
                  value={formData.presAddressCity}
                  onChange={handleChange}
                />
                {errors.presAddressCity && (
                  <div className={styles["wjoinregistration-error-text"]}>
                    {errors.presAddressCity}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      {/* Street Address - Common for all countries */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="presAddressStreet">Street Address</label>
        <textarea
          id="presAddressStreet"
          name="presAddressStreet"
          className={`${styles["wjoinregistration-form-control"]} ${
            errors.presAddressStreet ? styles["error"] : ""
          }`}
          value={formData.presAddressStreet}
          onChange={handleChange}
          rows={3}
        ></textarea>
        {errors.presAddressStreet && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.presAddressStreet}
          </div>
        )}
      </div>

      {/* ZIP/Postal Code - Common for all countries */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="presAddressZip">ZIP/Postal Code</label>
        <input
          type="text"
          id="presAddressZip"
          name="presAddressZip"
          className={`${styles["wjoinregistration-form-control"]} ${
            errors.presAddressZip ? styles["error"] : ""
          }`}
          value={formData.presAddressZip}
          onChange={handleChange}
        />
        {errors.presAddressZip && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.presAddressZip}
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <h3
        className={styles["wjoinregistration-form-section-title"]}
        style={{ marginTop: "30px" }}
      >
        Additional Information
      </h3>

      <div className={styles["wjoinregistration-form-row"]}>
        {/* Staying Status */}
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="stayingStatus">Living Status</label>
          <div className={styles["wjoinregistration-select-wrapper"]}>
            <select
              id="stayingStatus"
              name="stayingStatus"
              className={styles["wjoinregistration-form-control"]}
              value={formData.stayingStatus}
              onChange={handleChange}
            >
              {stayingStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Years in UAE */}
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="yearsInUAE">Years in UAE</label>
          <input
            type="number"
            id="yearsInUAE"
            name="yearsInUAE"
            className={styles["wjoinregistration-form-control"]}
            value={formData.yearsInUAE}
            onChange={handleYearsInUAEChange}
            min="0"
            max="99"
            placeholder="e.g., 5"
          />
        </div>
      </div>

      {/* Referral Source */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="referralSource">
          How did you hear about Bihar Samaj?
        </label>
        <div className={styles["wjoinregistration-select-wrapper"]}>
          <select
            id="referralSource"
            name="referralSource"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.referralSource ? styles["error"] : ""
            }`}
            value={formData.referralSource}
            onChange={handleReferralSourceChange}
          >
            {referralOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.referralSource && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.referralSource}
          </div>
        )}
      </div>

      {/* Conditional Field: Community Member Name */}
      {showCommunityMemberField && (
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="communityMemberName">Community Member's Name</label>
          <input
            type="text"
            id="communityMemberName"
            name="communityMemberName"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.communityMemberName ? styles["error"] : ""
            }`}
            value={formData.communityMemberName}
            onChange={(e) => {
              const { value } = e.target;
              // Only allow letters and spaces
              if (/^[A-Za-z ]*$/.test(value)) {
                handleChange(e);
              }
            }}
            maxLength={50}
            placeholder="Who referred you?"
          />
          {errors.communityMemberName && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.communityMemberName}
            </div>
          )}
        </div>
      )}

      {/* Conditional Field: Other Referral Source */}
      {showOtherReferralField && (
        <div className={styles["wjoinregistration-form-group"]}>
          <label htmlFor="otherReferralSource">Please specify</label>
          <input
            type="text"
            id="otherReferralSource"
            name="otherReferralSource"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.otherReferralSource ? styles["error"] : ""
            }`}
            value={formData.otherReferralSource}
            onChange={handleChange}
            maxLength={100}
            placeholder="How did you hear about us?"
          />
          {errors.otherReferralSource && (
            <div className={styles["wjoinregistration-error-text"]}>
              {errors.otherReferralSource}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PresentAddressStep;
