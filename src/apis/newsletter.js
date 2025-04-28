import api from "./index";

// Subscribe to newsletter
export const subscribeNewsletter = async (values) => {
  return await api.post("/news-letter/subscribe", values);
};

// Send OTP for Email Verification
export const sendNewsletterOtp = async (email) => {
  return await api.post("/news-letter/send-otp", { email });
};

// Verify Email with OTP
export const verifyNewsletterOtp = async (data) => {
  // Where `data` is an object that includes `email` and `otp` properties
  return await api.post("/news-letter/verify-otp", data);
};
