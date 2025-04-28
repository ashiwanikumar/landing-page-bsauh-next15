import React, { useState, useEffect } from "react";
import AuthenticationStep from "./AuthenticationStep";
import PersonalInfoStep from "./PersonalInfoStep";
import SocialMediaStep from "./SocialMediaStep";
import PermanentAddressStep from "./PermanentAddressStep";
import PresentAddressStep from "./PresentAddressStep";
import dynamic from "next/dynamic";
import {
  registerUserToWhatsapp,
  sendPreVerificationOTP,
  verifyPreVerificationOTP,
  sendWhatsappOTP,
  verifyWhatsappOTP,
  verifyWithGoogle,
} from "../../../apis/whatsappRegister";
import styles from "../../../styles/component/_registration.module.scss";

// Replace direct imports with dynamic imports:
// Instead of:
// import WhatsappVerificationStep from "./WhatsappVerificationStep";
// import SuccessMessage from "./SuccessMessage";
// import NotificationModal from "../../modal/whatsapp/NotificationModal";

// Use dynamic imports with SSR disabled:
const WhatsappVerificationStep = dynamic(
  () => import("./WhatsappVerificationStep"),
  {
    ssr: false,
  }
);

const SuccessMessage = dynamic(() => import("./SuccessMessage"), {
  ssr: false,
});

const NotificationModal = dynamic(
  () => import("../../modal/whatsapp/NotificationModal"),
  {
    ssr: false,
  }
);

// Initial form data
const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  isEmailVerified: false,
  googleAuth: false,
  whatsappNo: "",
  whatsappPrefix: "56",
  dateOfBirth: "",
  company: "",
  jobTitle: "",
  permAddressCountry: "India",
  permAddressState: "Bihar",
  permAddressCity: "",
  permAddressStreet: "",
  presentAddressCountry: "UAE",
  emergencyContact: "",
  presentAddressEmirate: "Abu Dhabi",
  presentAddressStreet: "",
  referralSource: "",
  communityMemberName: "",
  otherReferralSource: "",
  usingSocialMedia: "",
  facebook: "",
  instagram: "",
  otp: "",
  whatsappVerificationOtp: "",
  token: "",
};

const RegistrationForm = () => {
  // Load any saved data from localStorage
  const loadSavedData = () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        return {
          formData: initialFormData,
          currentStep: 0,
          isAuthenticated: false,
          authMethod: "",
          isWhatsappVerified: false,
        };
      }

      const savedData = localStorage.getItem("whatsappRegistrationData");
      const savedStep = localStorage.getItem("whatsappRegistrationStep");
      const savedIsAuthenticated = localStorage.getItem(
        "whatsappRegistrationIsAuthenticated"
      );
      const savedAuthMethod = localStorage.getItem(
        "whatsappRegistrationAuthMethod"
      );
      const savedIsWhatsappVerified = localStorage.getItem(
        "whatsappRegistrationIsWhatsappVerified"
      );

      return {
        formData: savedData ? JSON.parse(savedData) : initialFormData,
        currentStep: savedStep ? parseInt(savedStep) : 0,
        isAuthenticated: savedIsAuthenticated === "true",
        authMethod: savedAuthMethod || "",
        isWhatsappVerified: savedIsWhatsappVerified === "true",
      };
    } catch (error) {
      console.error("Error loading saved registration data:", error);
      return {
        formData: initialFormData,
        currentStep: 0,
        isAuthenticated: false,
        authMethod: "",
        isWhatsappVerified: false,
      };
    }
  };

  // Get saved data
  const savedData = loadSavedData();

  // Main state management
  const [currentStep, setCurrentStep] = useState(savedData.currentStep);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(
    savedData.isAuthenticated
  );
  const [authMethod, setAuthMethod] = useState(savedData.authMethod); // "google" or "email"

  // WhatsApp verification state
  const [isWhatsappVerified, setIsWhatsappVerified] = useState(
    savedData.isWhatsappVerified
  );

  // Form data
  const [formData, setFormData] = useState(savedData.formData);

  // Validation states
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // States for multi-step form
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState("+971");

  // Add notification modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    type: "info",
    title: "",
    message: "",
    duration: 0,
    actionButton: null,
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    if (!showSuccess) {
      // Don't save if we've successfully submitted
      localStorage.setItem(
        "whatsappRegistrationData",
        JSON.stringify(formData)
      );
      localStorage.setItem("whatsappRegistrationStep", currentStep.toString());
      localStorage.setItem(
        "whatsappRegistrationIsAuthenticated",
        isAuthenticated.toString()
      );
      localStorage.setItem("whatsappRegistrationAuthMethod", authMethod);
      localStorage.setItem(
        "whatsappRegistrationIsWhatsappVerified",
        isWhatsappVerified.toString()
      );
    }
  }, [
    formData,
    currentStep,
    isAuthenticated,
    authMethod,
    isWhatsappVerified,
    showSuccess,
  ]);

  useEffect(() => {
    validateForm();
  }, [formData, currentStep, isAuthenticated, isWhatsappVerified]);

  // Handle authentication success
  const handleAuthSuccess = (method, data = {}) => {
    setIsAuthenticated(true);
    setAuthMethod(method);

    // Update form data with authentication info
    setFormData((prev) => ({
      ...prev,
      ...data,
      isEmailVerified: true,
    }));

    setCurrentStep(1); // Move to personal information
  };

  // Validate the current form step
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    switch (currentStep) {
      case 0: // Authentication
        isValid = isAuthenticated;
        break;

      case 1: // Personal Info
      // Make sure first name and last name are present regardless of auth method
      case 1: // Personal Info
        // Make sure first name and last name are present regardless of auth method
        if (!formData.firstName) errors.firstName = "First name is required";
        if (!formData.lastName) errors.lastName = "Last name is required";
        if (!formData.jobTitle) errors.jobTitle = "Job title is required";
        if (!formData.company) errors.company = "Company is required";

        // Improved WhatsApp validation - check for exactly 7 digits
        if (!formData.whatsappNo) {
          errors.whatsappNo = "WhatsApp number is required";
        } else if (formData.whatsappNo.length !== 7) {
          errors.whatsappNo = "WhatsApp number must be exactly 7 digits";
        }

        if (!formData.dateOfBirth)
          errors.dateOfBirth = "Date of birth is required";

        isValid = Object.keys(errors).length === 0;
        break;

      case 2: // Social Media
        if (!formData.usingSocialMedia) {
          errors.usingSocialMedia = "Please select if you use social media";
        } else if (
          formData.usingSocialMedia === "yes" &&
          !formData.facebook &&
          !formData.instagram
        ) {
          errors.socialProfiles =
            "Please provide at least one social media profile";
        }

        isValid = Object.keys(errors).length === 0;
        break;

      case 3: // Permanent Address
        if (!formData.permAddressState)
          errors.permAddressState = "State is required";
        if (!formData.permAddressCity)
          errors.permAddressCity = "City is required";
        if (!formData.permAddressStreet)
          errors.permAddressStreet = "Street address is required";
        if (!formData.emergencyContact) {
          errors.emergencyContact = "Emergency contact is required";
        } else if (formData.emergencyContact.length !== 10) {
          errors.emergencyContact =
            "Emergency contact must be exactly 10 digits";
        }

        isValid = Object.keys(errors).length === 0;
        break;

      case 4: // Present Address
        if (!formData.presentAddressEmirate)
          errors.presentAddressEmirate = "Emirate is required";
        if (!formData.presentAddressStreet)
          errors.presentAddressStreet = "Street address is required";
        if (!formData.referralSource)
          errors.referralSource = "Please select how you heard about us";

        // Conditional validation based on referral source
        if (
          formData.referralSource === "Community Member" &&
          !formData.communityMemberName
        ) {
          errors.communityMemberName =
            "Please provide the community member's name";
        }
        if (
          formData.referralSource === "Other" &&
          !formData.otherReferralSource
        ) {
          errors.otherReferralSource = "Please specify the referral source";
        }

        isValid = Object.keys(errors).length === 0;
        break;

      case 5: // WhatsApp Verification
        isValid = isWhatsappVerified;
        break;
    }

    setValidationErrors(errors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Show notification helper function
  const showNotification = (props) => {
    setModalProps(props);
    setModalOpen(true);
  };

  // Close notification
  const closeNotification = () => {
    setModalOpen(false);
  };

  // Handle OTP sent success
  const handleOtpSent = () => {
    showNotification({
      type: "info",
      title: "Verification Code Sent",
      message:
        "A 6-digit verification code has been sent to your email. Please check your inbox and enter the code to continue.",
      duration: 3000,
    });
  };

  // Handle WhatsApp OTP sent success
  const handleWhatsappOtpSent = () => {
    showNotification({
      type: "info",
      title: "WhatsApp Verification Code Sent",
      message:
        "A 6-digit verification code has been sent to your WhatsApp. Please check your messages and enter the code to continue.",
      duration: 3000,
    });
  };

  // Handle form submission success
  const handleSubmissionSuccess = () => {
    showNotification({
      type: "success",
      title: "Registration Successful!",
      message:
        "Your registration has been completed successfully. You will be redirected to the home page shortly.",
      duration: 5000,
    });
  };

  // Check for missing steps before submission
  const checkMissingSteps = () => {
    const missingSteps = [];

    // Check each step for completion
    if (!isAuthenticated) {
      missingSteps.push("Authentication");
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.whatsappNo ||
      !formData.dateOfBirth
    ) {
      missingSteps.push("Personal Information");
    }

    if (
      formData.usingSocialMedia === "yes" &&
      !formData.facebook &&
      !formData.instagram
    ) {
      missingSteps.push("Social Media Information");
    }

    if (
      !formData.permAddressState ||
      !formData.permAddressCity ||
      !formData.permAddressStreet
    ) {
      missingSteps.push("Permanent Address");
    }

    if (
      !formData.presentAddressEmirate ||
      !formData.presentAddressStreet ||
      !formData.referralSource
    ) {
      missingSteps.push("Present Address");
    }

    if (!isWhatsappVerified) {
      missingSteps.push("WhatsApp Verification");
    }

    return missingSteps;
  };

  // Handle WhatsApp verification success
  const handleWhatsappVerificationSuccess = (otpId) => {
    setIsWhatsappVerified(true);
    setFormData((prev) => ({
      ...prev,
      whatsappVerificationOtp: otpId,
    }));
  };

  // Format WhatsApp number for submission
  const getFormattedWhatsappNumber = () => {
    return `${countryCode} ${formData.whatsappPrefix}${formData.whatsappNo}`;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Add debugging to see what's being sent
    console.log("Submitting form with token:", formData.token);

    if (!formData.token) {
      showNotification({
        type: "error",
        title: "Authentication Error",
        message: "Missing authentication token. Please try signing in again.",
        duration: 5000,
      });
      return;
    }

    // Check for missing steps
    const missingSteps = checkMissingSteps();

    if (missingSteps.length > 0) {
      showNotification({
        type: "warning",
        title: "Incomplete Registration",
        message: (
          <>
            <p>Please complete the following steps before submitting:</p>
            <ul style={{ textAlign: "left", marginTop: "10px" }}>
              {missingSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </>
        ),
        duration: 5000,
      });
      return;
    }

    if (!isFormValid) {
      setError("Please complete all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Submission data should include the token field
      const submissionData = {
        ...formData,
        whatsappNo: getFormattedWhatsappNumber(),
        whatsappVerified: isWhatsappVerified,
        token: formData.token, // Make sure token is explicitly included
      };

      // Submit registration
      await registerUserToWhatsapp(submissionData);

      // Show success notification
      handleSubmissionSuccess();

      // Show success message
      setShowSuccess(true);
      setLoading(false);

      // Clear localStorage data on successful submission
      clearStoredData();

      // Reset form after a delay
      setTimeout(() => {
        resetForm();
      }, 10000);
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error("Registration error:", error);

      // Show error notification
      showNotification({
        type: "error",
        title: "Registration Failed",
        message:
          error.response?.data?.message ||
          "Unable to complete registration. Please try again.",
        duration: 5000,
      });
    }
  };

  // Clear all stored registration data
  const clearStoredData = () => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    // Remove all items related to WhatsApp registration
    localStorage.removeItem("whatsappRegistrationData");
    localStorage.removeItem("whatsappRegistrationStep");
    localStorage.removeItem("whatsappRegistrationIsAuthenticated");
    localStorage.removeItem("whatsappRegistrationAuthMethod");
    localStorage.removeItem("whatsappRegistrationIsWhatsappVerified");

    // Force a cleanup by ensuring nothing is left in localStorage for this form
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("whatsappRegistration")) {
        localStorage.removeItem(key);
      }
    });
  };

  // Reset form to initial state
  const resetForm = () => {
    // First clear localStorage
    clearStoredData();

    // Reset all state values
    setFormData({ ...initialFormData });
    setCurrentStep(0);
    setIsAuthenticated(false);
    setIsWhatsappVerified(false);
    setAuthMethod("");
    setShowSuccess(false);
    setError("");
    setValidationErrors({});
    setIsFormValid(false);

    // Show notification for reset
    showNotification({
      type: "info",
      title: "Form Reset",
      message: (
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#333333",
              fontWeight: "500",
              lineHeight: "1.5",
              margin: "15px 0",
            }}
          >
            Your registration form has been reset. You can start over.
          </p>
        </div>
      ),
      duration: 3000,
      actionButtonText: "Close",
      customClass: "form-reset-modal",
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (validateForm()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Define steps for the registration process
  const steps = [
    "Authentication",
    "Personal Information",
    "Social Media",
    "Permanent Address",
    "Present Address",
    "WhatsApp Verification",
  ];

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <AuthenticationStep
            onAuthSuccess={handleAuthSuccess}
            formData={formData}
            setFormData={setFormData}
            sendRegistrationOTP={sendPreVerificationOTP}
            verifyRegistrationOTP={verifyPreVerificationOTP}
            verifyWithGoogle={verifyWithGoogle}
          />
        );
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            errors={validationErrors}
            setErrors={setValidationErrors}
            isGoogleAuth={formData.googleAuth}
          />
        );
      case 2:
        return (
          <SocialMediaStep
            formData={formData}
            handleChange={handleChange}
            errors={validationErrors}
          />
        );
      case 3:
        return (
          <PermanentAddressStep
            formData={formData}
            handleChange={handleChange}
            errors={validationErrors}
            setErrors={setValidationErrors}
            states={states}
            setStates={setStates}
            cities={cities}
            setCities={setCities}
          />
        );
      case 4:
        return (
          <PresentAddressStep
            formData={formData}
            handleChange={handleChange}
            errors={validationErrors}
          />
        );
      case 5:
        return (
          <WhatsappVerificationStep
            formData={formData}
            onVerificationSuccess={handleWhatsappVerificationSuccess}
            sendWhatsappOTP={sendWhatsappOTP}
            verifyWhatsappOTP={verifyWhatsappOTP}
            countryCode={countryCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles["wjoinregistration-main-container"]}>
        <div className={styles["wjoinregistration-page-header"]}>
          <div className={styles["wjoinregistration-whatsapp-title-container"]}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 256 258"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="logosWhatsappIcon0"
                  x1="50%"
                  x2="50%"
                  y1="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#1FAF38"></stop>
                  <stop offset="100%" stopColor="#60D669"></stop>
                </linearGradient>
                <linearGradient
                  id="logosWhatsappIcon1"
                  x1="50%"
                  x2="50%"
                  y1="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F9F9F9"></stop>
                  <stop offset="100%" stopColor="#FFF"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#logosWhatsappIcon0)"
                d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
              ></path>
              <path
                fill="url(#logosWhatsappIcon1)"
                d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"
              ></path>
              <path
                fill="#FFF"
                d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
              ></path>
            </svg>
            <h2 className={styles["wjoinregistration-registration-title"]}>
              Join our Bihar Samaj Abu Dhabi Community
            </h2>
          </div>
        </div>

        {showSuccess ? (
          <SuccessMessage onClose={resetForm} />
        ) : (
          <div
            className={styles["wjoinregistration-registration-form-container"]}
          >
            {/* Progress Stepper */}
            <div className={styles["wjoinregistration-stepper"]}>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`${styles["wjoinregistration-step"]} ${
                    index < currentStep ? styles["completed"] : ""
                  } ${index === currentStep ? styles["active"] : ""}`}
                >
                  <div className={styles["wjoinregistration-step-number"]}>
                    {index + 1}
                  </div>
                  <div className={styles["wjoinregistration-step-title"]}>
                    {step}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className={styles["wjoinregistration-form-content"]}>
              {renderStepContent()}
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles["wjoinregistration-error-message"]}>
                {error}
              </div>
            )}

            {/* Form Navigation */}
            <div className={styles["wjoinregistration-form-navigation"]}>
              {currentStep > 0 && (
                <button
                  type="button"
                  className={styles["wjoinregistration-btn-secondary"]}
                  onClick={goToPreviousStep}
                  disabled={loading}
                >
                  Previous
                </button>
              )}

              <button
                type="button"
                className={styles["wjoinregistration-btn-secondary"]}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to reset the form and start over?"
                    )
                  ) {
                    resetForm();
                  }
                }}
                disabled={loading}
              >
                Start Over
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className={styles["wjoinregistration-btn-primary"]}
                  onClick={goToNextStep}
                  disabled={!isFormValid || loading}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className={styles["wjoinregistration-btn-submit"]}
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading || !isWhatsappVerified}
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Add NotificationModal */}
        <NotificationModal
          isOpen={modalOpen}
          onClose={closeNotification}
          type={modalProps.type}
          title={modalProps.title}
          message={modalProps.message}
          duration={modalProps.duration}
          actionButton={modalProps.actionButton}
        />
      </div>
    </>
  );
};

// Wrap with client-side only renderer
export default dynamic(() => Promise.resolve(RegistrationForm), {
  ssr: false,
});
