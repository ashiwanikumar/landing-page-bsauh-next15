import api from "./index";

// Helper function to safely get token from localStorage
const getAuthHeaders = () => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

// PRE-VERIFICATION ENDPOINTS
// Send OTP for Email Pre-Verification (before form filling)
export const sendPreVerificationOTP = async (data) => {
  try {
    console.log("Sending pre-verification OTP request with data:", data);
    const headers = getAuthHeaders();

    const response = await api.post(
      "/whatsapp-registration/pre-verify/email",
      data,
      {
        headers,
      }
    );

    console.log("Pre-verification OTP response:", response);
    console.log("Pre-verification OTP response data:", response.data);
    return response;
  } catch (error) {
    console.error("Error sending pre-verification OTP:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
};

// Verify Email with OTP (pre-verification)
export const verifyPreVerificationOTP = async (data) => {
  try {
    console.log("Verifying OTP with data:", {
      email: data.email,
      otp: data.otp,
      otpLength: data.otp?.length,
      otpType: typeof data.otp,
    });

    // Ensure OTP is a string
    const verificationData = {
      ...data,
      otp: String(data.otp).trim(),
    };

    console.log("Processed verification data being sent:", verificationData);

    const response = await api.post(
      "/whatsapp-registration/pre-verify/verify-otp",
      verificationData
    );

    console.log("OTP verification full response:", response);
    console.log("OTP verification response data:", response.data);

    // Check if token exists in response
    if (response.data && response.data.token) {
      console.log(
        "✅ Token received successfully:",
        response.data.token.substring(0, 20) + "..."
      );
    } else {
      console.warn("⚠️ No token found in response data!");
    }

    return response;
  } catch (error) {
    console.error("❌ OTP verification failed with error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received. Request:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};

// Google Authentication Pre-Verification
export const verifyWithGoogle = async (data) => {
  try {
    console.log("Verifying with Google. Data:", {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      tokenLength: data.token?.length || 0,
    });

    const response = await api.post(
      "/whatsapp-registration/pre-verify/google",
      data
    );

    console.log("Google verification response:", response);
    console.log("Google verification data:", response.data);

    if (response.data && response.data.token) {
      console.log("Google auth successful, token received");
    } else {
      console.warn("Google auth response missing token");
    }

    return response;
  } catch (error) {
    console.error("Google verification error:", error);
    console.error("Error response data:", error.response?.data);
    throw error;
  }
};

// Check Pre-Verification Status
export const checkPreVerificationStatus = async (data) => {
  try {
    console.log(
      "Checking pre-verification status with token:",
      data.token
        ? "Token provided (length: " + data.token.length + ")"
        : "No token provided"
    );

    const headers = getAuthHeaders();

    const response = await api.post(
      "/whatsapp-registration/pre-verify/check-status",
      data,
      { headers }
    );

    console.log("Pre-verification status response:", response.data);
    return response;
  } catch (error) {
    console.error("Error checking pre-verification status:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// REGISTRATION ENDPOINT
// Register user to WhatsApp (now requires token)
export const registerUserToWhatsapp = async (values) => {
  try {
    console.log("Registering user with data:", {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      hasToken: Boolean(values.token),
      whatsappVerified: values.whatsappVerified,
    });

    if (!values.token) {
      console.error("Missing token in registration data!");
    }

    const response = await api.post("/whatsapp-registration", values);
    console.log("Registration successful:", response.data);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

// LEGACY VERIFICATION (less important in new flow)
// Verify WhatsApp registration by email (for legacy users)
export const verifyWhatsappRegistrationByEmail = async (token) => {
  try {
    console.log(
      "Verifying registration by email token. Token length:",
      token.length
    );

    const response = await api.post(
      `/whatsapp/registration/verify/email/${token}`
    );
    console.log("Email verification response:", response.data);
    return response;
  } catch (error) {
    console.error("Email verification error:", error);
    console.error("Error response data:", error.response?.data);
    throw error;
  }
};

// WHATSAPP NUMBER VERIFICATION
// Send OTP for WhatsApp Verification
export const sendWhatsappOTP = async (data) => {
  try {
    console.log("Sending WhatsApp OTP to:", {
      phoneNumber: data.phoneNumber,
      email: data.email,
    });

    const response = await api.post(
      "/whatsapp-registration/send-whatsapp-otp",
      data
    );
    console.log("WhatsApp OTP sent successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp OTP:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Verify WhatsApp number with OTP
export const verifyWhatsappOTP = async (data) => {
  try {
    console.log("Verifying WhatsApp OTP:", {
      phoneNumber: data.phoneNumber,
      email: data.email,
      otpLength: data.otp?.length || 0,
    });

    const response = await api.post(
      "/whatsapp-registration/verify-whatsapp-otp",
      data
    );
    console.log("WhatsApp OTP verification successful:", response.data);
    return response;
  } catch (error) {
    console.error("WhatsApp OTP verification failed:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Resend WhatsApp OTP (new function)
export const resendWhatsappOTP = async (data) => {
  try {
    console.log("Resending WhatsApp OTP to:", {
      phoneNumber: data.phoneNumber,
      email: data.email,
    });

    const response = await api.post(
      "/whatsapp-registration/resend-whatsapp-otp",
      data
    );
    console.log("WhatsApp OTP resent successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error resending WhatsApp OTP:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Check WhatsApp Verification Status
export const checkWhatsappVerificationStatus = async (email) => {
  try {
    console.log("Checking WhatsApp verification status for email:", email);

    const response = await api.get(
      "/whatsapp-registration/check-verification-status",
      {
        params: { email },
      }
    );

    console.log("WhatsApp verification status:", response.data);
    return response;
  } catch (error) {
    console.error("Error checking WhatsApp verification status:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// USER PROFILE ENDPOINTS (new functions)
// Get user profile using token
export const getUserProfile = async (data) => {
  try {
    console.log(
      "Getting user profile with token:",
      data.token ? "Token provided" : "No token provided"
    );

    const response = await api.post("/whatsapp-registration/profile", data);
    console.log("User profile retrieved successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error getting user profile:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (data) => {
  try {
    console.log("Updating user profile:", {
      hasToken: Boolean(data.token),
      fields: Object.keys(data).filter((key) => key !== "token"),
    });

    const response = await api.put("/whatsapp-registration/profile", data);
    console.log("Profile updated successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Error updating user profile:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};
