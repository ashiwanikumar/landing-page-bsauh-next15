import React from "react";
import styles from "../../../styles/component/_registration.module.scss";

const SocialMediaStep = ({ formData, handleChange, errors }) => {
  const handleSocialMediaChange = (value) => {
    handleChange({
      target: {
        name: "usingSocialMedia",
        value,
      },
    });
  };

  return (
    <div className={styles["wjoinregistration-social-media-step"]}>
      <h2 className={styles["wjoinregistration-form-section-title"]}>
        Social Media
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
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
          <h3>Your Social Profiles</h3>
        </div>
        <p>
          Sharing your social media handles helps us connect better within our
          community. This information is optional and will only be visible to
          approved members.
        </p>
      </div>

      {/* LinkedIn URL */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="linkedInUrl">
          LinkedIn Profile URL{" "}
          <span className={styles["optional"]}>(Optional)</span>
        </label>
        <div className={styles["wjoinregistration-input-with-icon"]}>
          <span className={styles["wjoinregistration-input-icon"]}>
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
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </span>
          <input
            type="url"
            id="linkedInUrl"
            name="linkedInUrl"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.linkedInUrl ? styles["error"] : ""
            }`}
            placeholder="https://www.linkedin.com/in/username"
            value={formData.linkedInUrl}
            onChange={handleChange}
          />
        </div>
        {errors.linkedInUrl && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.linkedInUrl}
          </div>
        )}
      </div>

      {/* Facebook URL */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="facebookUrl">
          Facebook Profile URL{" "}
          <span className={styles["optional"]}>(Optional)</span>
        </label>
        <div className={styles["wjoinregistration-input-with-icon"]}>
          <span className={styles["wjoinregistration-input-icon"]}>
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
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </span>
          <input
            type="url"
            id="facebookUrl"
            name="facebookUrl"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.facebookUrl ? styles["error"] : ""
            }`}
            placeholder="https://www.facebook.com/username"
            value={formData.facebookUrl}
            onChange={handleChange}
          />
        </div>
        {errors.facebookUrl && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.facebookUrl}
          </div>
        )}
      </div>

      {/* Instagram URL */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="instagramUrl">
          Instagram Profile URL{" "}
          <span className={styles["optional"]}>(Optional)</span>
        </label>
        <div className={styles["wjoinregistration-input-with-icon"]}>
          <span className={styles["wjoinregistration-input-icon"]}>
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
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </span>
          <input
            type="url"
            id="instagramUrl"
            name="instagramUrl"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.instagramUrl ? styles["error"] : ""
            }`}
            placeholder="https://www.instagram.com/username"
            value={formData.instagramUrl}
            onChange={handleChange}
          />
        </div>
        {errors.instagramUrl && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.instagramUrl}
          </div>
        )}
      </div>

      {/* Twitter URL */}
      <div className={styles["wjoinregistration-form-group"]}>
        <label htmlFor="twitterUrl">
          X (Twitter) Profile URL{" "}
          <span className={styles["optional"]}>(Optional)</span>
        </label>
        <div className={styles["wjoinregistration-input-with-icon"]}>
          <span className={styles["wjoinregistration-input-icon"]}>
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
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </span>
          <input
            type="url"
            id="twitterUrl"
            name="twitterUrl"
            className={`${styles["wjoinregistration-form-control"]} ${
              errors.twitterUrl ? styles["error"] : ""
            }`}
            placeholder="https://twitter.com/username"
            value={formData.twitterUrl}
            onChange={handleChange}
          />
        </div>
        {errors.twitterUrl && (
          <div className={styles["wjoinregistration-error-text"]}>
            {errors.twitterUrl}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaStep;
