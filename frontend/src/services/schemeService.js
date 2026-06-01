import api from "./api";

export const getRecommendations = async (email) => {
    const response = await api.get(`/recommendations/recommend/${email}`);
    return response.data;
};