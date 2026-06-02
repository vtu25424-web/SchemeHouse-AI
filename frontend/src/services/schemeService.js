import api from "./api";

/**
 * Fetch AI-powered scheme recommendations for a user
 * @param {string} email - user email
 */
export const getRecommendations = async (email) => {
    const response = await api.get(
        `/api/recommendations/${email}`
    );

    return response.data;
};