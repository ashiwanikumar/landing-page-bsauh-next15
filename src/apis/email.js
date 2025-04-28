import api from "./index";

export const unsubscribeFromEmail = async (data) => {
  return await api.post("/unsubscribe", data);
};

export const resubscribeToEmail = async (data) => {
  return await api.post("/resubscribe", data);
};

export const getUnsubscribeStatus = async (email) => {
  return await api.get(`/status/${email}`);
};
