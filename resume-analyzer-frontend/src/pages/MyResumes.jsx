import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import PageTitle from "../components/common/PageTitle";
import { getMyResumes } from "../services/resumeService";

function MyResumes() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchResumes = async () => {

            try {

                const data = await getMyResumes();
                setResumes(data);

            } catch (error) {

                console.error(error);
                setError("Unable to load your resumes.");

            } finally {

                setLoading(false);

            }
        };

        fetchResumes();

    }, []);

    const handleAnalyze = (resumeId) => {
        navigate(`/analysis/${resumeId}`);
    };

    return (
        <>
            <Navbar title="My Resumes" />

            <div className="mt-8">

                <PageTitle
                    title="My Resumes"
                    subtitle="Choose a resume to analyze"
                />

                {loading && (
                    <p>Loading resumes...</p>
                )}

                {error && (
                    <p className="text-red-600">{error}</p>
                )}

                {!loading && !error && resumes.length === 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p>No resumes uploaded yet.</p>

                        <button
                            onClick={() => navigate("/upload")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Upload Resume
                        </button>
                    </div>
                )}

                {!loading && !error && resumes.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm">

                        {resumes.map((resume) => (

                            <div
                                key={resume.id}
                                className="flex items-center justify-between p-5 border-b last:border-b-0"
                            >

                                <div>
                                    <h2 className="font-semibold">
                                        {resume.fileName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Uploaded:{" "}
                                        {new Date(
                                            resume.uploadTime
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleAnalyze(resume.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Analyze
                                </button>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </>
    );
}

export default MyResumes;