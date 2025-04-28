import api from "./index";

// Register user to event
export const registerUserToEvent = async (values) => {
  return await api.post("/event-register", values);
};

// Cancel event registration
export const eventCancellation = async (id, email, verificationNum) => {
  return await api.post(`/event-register/${id}/cancellation`, {
    email,
    verificationNum,
  });
};
