import api from "./index";

// --------- Hero Category API --------- //

// Get all heroCategories
export const getAllHeroCategories = async () => {
  return await api.get(`/hero/categories`);
};

// --------- Hero Image API --------- //
// Get all hero images approved
export const getAllHeroImagesApproved = async () => {
  return await api.get(`/hero/images/approved`);
};
