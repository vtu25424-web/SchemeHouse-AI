import api from "./api";

/**
 * Fetch personalized scheme recommendations
 * @param {string} email - User email
 * @returns {Promise<Array>}
 */
export const getRecommendations = async (email) => {
  try {
    const response = await api.get(
      `/api/recommendations/${email}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recommendations:",
      error
    );
    throw error;
  }
};