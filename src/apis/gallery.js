import api from "./index";

// --------- Gallery Category API --------- //

// Get all galleryCategories
export const getAllGalleryCategories = async () => {
  return await api.get(`/gallery/categories`);
};

// --------- Gallery Image API --------- //
// Get all gallery images approved
export const getAllGalleryImagesApproved = async () => {
  return await api.get(`/gallery/images/approved`);
};
