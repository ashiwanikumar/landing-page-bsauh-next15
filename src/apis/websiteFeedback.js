import api from "./index";

// Send OTP for Email Verification
export const sendFeedbackOtp = async (email) => {
  return await api.post("/feedback/send-otp", { email });
};

// Verify Email with OTP
export const verifyFeedbackOTP = async (data) => {
  // Where `data` is an object that includes `email` and `otp` properties
  return await api.post("/feedback/verify-otp", data);
};

// Save Feedback Data
export const saveFeedback = async (feedbackData) => {
  // Assuming '/submit-feedback' is the endpoint for submitting feedback data
  // and `feedbackData` includes all necessary information like email, firstName, lastName, message, etc.
  return await api.post("/save-feedback", feedbackData);
};
