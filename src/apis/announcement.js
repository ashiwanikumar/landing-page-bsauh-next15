import api from "./index";

// Get all announcement approved
export const getAllAnnouncementsApproved = async () => {
  return await api.get(`/announcements-approved`);
};
