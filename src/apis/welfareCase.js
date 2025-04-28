import api from "./index";

// Create a new welfare case
export const createWelfareCase = async (values) => {
  return await api.post("/welfare-case", values);
};

// Upload supporting documents for welfare case
export const uploadWelfareDocuments = async (caseId, formData, config) => {
  return await api.post(`/welfare-case/${caseId}/documents`, formData, config);
};

// Get all visa residence options (for dropdown)
export const getVisaResidenceOptions = async () => {
  return await api.get("/welfare-case/visa-residences");
};

// Get all case types (for dropdown)
export const getCaseTypes = async () => {
  return await api.get("/welfare-case/case-types");
};

// Check case status using reference number
export const checkCaseStatus = async (referenceNumber) => {
  return await api.get(`/welfare-case/status/${referenceNumber}`);
};

// Get single case details by ID
export const getWelfareCaseById = async (caseId) => {
  return await api.get(`/welfare-case/${caseId}`);
};

// Update existing welfare case
export const updateWelfareCase = async (caseId, values) => {
  return await api.put(`/welfare-case/${caseId}`, values);
};

// Delete a specific document
export const deleteWelfareDocument = async (caseId, documentId) => {
  return await api.delete(`/welfare-case/${caseId}/document/${documentId}`);
};
