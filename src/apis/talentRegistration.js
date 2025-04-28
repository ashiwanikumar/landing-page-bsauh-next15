import api from "./index";

// Send OTP for Email Verification in Talent Registration
export const sendTalentRegistrationOTP = async (data) => {
  return await api.post("/talent-registration/send-otp", data);
};

// Verify Email with OTP in Talent Registration
export const verifyTalentRegistrationOTP = async (data) => {
  return await api.post("/talent-registration/verify-otp", data);
};

// Register user to Talent Registration
export const registerUserToTalent = async (values) => {
  return await api.post("/talent-registration", values);
};

// Upload talent profile picture
export const uploadTalentProfilePicture = async (values, config) => {
  return await api.post(`/talent-registration/profile-picture`, values, config);
};
