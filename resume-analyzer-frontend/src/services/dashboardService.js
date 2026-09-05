import api from "../api/api";

export const getDashboardData = async () => {

    const resumeId = localStorage.getItem("resumeId");

    if (!resumeId) {
        return {
            uploaded: "No",
            resumeId: "--",
            atsScore: "--"
        };
    }

    try {

        const response = await api.get(`/resume/score/${resumeId}`);

        return {
            uploaded: "Yes ✅",
            resumeId,
            atsScore: `${response.data.atsScore}%`
        };

    } catch (error) {

        console.error(error);

        return {
            uploaded: "Yes ✅",
            resumeId,
            atsScore: "N/A"
        };

    }
};