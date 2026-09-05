import api from "../api/api";

export const analyzeResume = async (resumeId) => {

    const response = await api.get(`/ai/analyze/${resumeId}`);

    return response.data;
};