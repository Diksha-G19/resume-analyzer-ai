import api from "../api/api";

export const matchResume = async (resumeId, jobDescription) => {

    const response = await api.post(
        "/job-match",
        {
            resumeId: Number(resumeId),
            jobDescription: jobDescription
        }
    );

    return response.data;
};