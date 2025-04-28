import api from "./index";

// Get all approved community members with pagination
export const getAllApprovedCommunityMembersPaginated = async (
  page,
  perPage
) => {
  return await api.get(
    `/community-members-approved-paginated?page=${page}&perPage=${perPage}`
  );
};

// Post a new community member
export const createCommunityMember = async (data) => {
  return await api.post("/community-member", data);
};
