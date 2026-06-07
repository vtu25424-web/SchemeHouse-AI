import api from "./api";

/**
 * Fetch all schemes
 */
export const getAllSchemes = async () => {
  const response = await api.get("/api/schemes");
  return response.data.data;
};

/**
 * Search schemes by keyword
 */
export const searchSchemes = async (keyword) => {
  const response = await api.get(
    `/api/schemes/search?keyword=${keyword}`
  );
  return response.data.data;
};

/**
 * Filter schemes by category
 */
export const filterSchemes = async (category) => {
  const response = await api.get(
    `/api/schemes/filter?category=${category}`
  );
  return response.data.data;
};

/**
 * Filter schemes by income
 */
export const filterByIncome = async (income) => {
  const response = await api.get(
    `/api/schemes/filter-income?income=${income}`
  );
  return response.data.data;
};

/**
 * Fetch personalized scheme recommendations
 * @param {string} email
 */
export const getRecommendations = async (email) => {
  const response = await api.get(
    `/api/recommendations/${email}`
  );

  // Return full response object
  return response.data;
};