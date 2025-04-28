import api from "./index";

// Save new visitor
export const saveVisitor = async (meta, utm_source) => {
  return await api.post("/visit", { meta, utm_source });
};

// Captcha verify token
export const verifyCaptcha = async (token) => {
  return await api.post("/verify/captcha", {
    token,
  });
};
