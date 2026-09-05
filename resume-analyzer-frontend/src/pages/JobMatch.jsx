import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import PageTitle from "../components/common/PageTitle";
import { getMyResumes } from "../services/resumeService";
import { matchResume } from "../services/jobMatchService";

function JobMatch() {

    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState("");

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingResumes, setLoadingResumes] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const loadData = async () => {

            try {

                // Restore saved Job Match data
                const savedResume =
                    sessionStorage.getItem("jobMatch_selectedResume");

                const savedJobDescription =
                    sessionStorage.getItem("jobMatch_jobDescription");

                if (savedResume) {
                    setSelectedResume(savedResume);
                }

                if (savedJobDescription) {
                    setJobDescription(savedJobDescription);
                }

                // Load user's resumes
                const data = await getMyResumes();

                setResumes(data);

                // Restore previous result
                if (savedResume) {

                    const storageKey = `jobMatch_${savedResume}`;

                    const savedResult =
                        sessionStorage.getItem(storageKey);

                    if (savedResult) {

                        try {

                            console.log("Restoring saved Job Match result.");

                            setResult(JSON.parse(savedResult));

                        } catch (error) {

                            console.error(
                                "Unable to restore saved job match:",
                                error
                            );

                        }
                    }
                }

            } catch (error) {

                console.error("RESUME ERROR:", error);

                setError("Unable to load your resumes.");

            } finally {

                setLoadingResumes(false);

            }

        };

        loadData();

    }, []);

    const handleMatch = async () => {

        if (!selectedResume) {

            setError("Please select a resume.");

            return;
        }

        if (!jobDescription.trim()) {

            setError("Please enter a job description.");

            return;
        }

        setError("");
        sessionStorage.setItem(
            "jobMatch_selectedResume",
            selectedResume
        );

        sessionStorage.setItem(
            "jobMatch_jobDescription",
            jobDescription
        );

        /*
         * Create a unique key using resume ID + job description.
         * This allows the same resume to be matched with
         * different jobs during the same session.
         */
        const storageKey = `jobMatch_${selectedResume}`;


        // Check session storage first
        const storedResult =
            sessionStorage.getItem(storageKey);

        if (storedResult) {

            console.log("Using saved job match result.");

            setResult(JSON.parse(storedResult));

            return;
        }


        try {

            setLoading(true);

            console.log(
                "Matching resume:",
                selectedResume
            );

            const data = await matchResume(
                selectedResume,
                jobDescription
            );

            console.log("Job match response:", data);


            // Save result for current session
            sessionStorage.setItem(
                storageKey,
                JSON.stringify(data)
            );


            setResult(data);

        } catch (error) {

            console.error(
                "JOB MATCH ERROR:",
                error
            );

            setError(
                "Unable to analyze job match."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <>
            <Navbar title="Job Match" />

            <div className="mt-8">

                <PageTitle
                    title="Job Match"
                    subtitle="Compare your resume with a job description"
                />


                {/* Input Section */}

                <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl">

                    {/* Resume Selection */}

                    <div className="mb-6">

                        <label className="block font-semibold mb-2">
                            Select Resume
                        </label>

                        {loadingResumes ? (

                            <p>
                                Loading resumes...
                            </p>

                        ) : resumes.length === 0 ? (

                            <div>

                                <p className="text-gray-600">
                                    No resumes uploaded yet.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/upload")
                                    }
                                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Upload Resume
                                </button>

                            </div>

                        ) : (

                            <select
                                value={selectedResume}
                                onChange={(e) => {

                                    const resumeId = e.target.value;

                                    setSelectedResume(resumeId);
                                    setError("");

                                    sessionStorage.setItem(
                                        "jobMatch_selectedResume",
                                        resumeId
                                    );
                                }}
                                className="w-full border rounded-md p-3"
                            >

                                <option value="">
                                    -- Select a Resume --
                                </option>

                                {resumes.map((resume) => (

                                    <option
                                        key={resume.id}
                                        value={resume.id}
                                    >
                                        {resume.fileName}
                                    </option>

                                ))}

                            </select>

                        )}

                    </div>


                    {/* Job Description */}

                    <div className="mb-6">

                        <label className="block font-semibold mb-2">
                            Job Description
                        </label>

                        <textarea
                            value={jobDescription}
                            onChange={(e) => {

                                const value = e.target.value;

                                setJobDescription(value);

                                sessionStorage.setItem(
                                    "jobMatch_jobDescription",
                                    value
                                );
                            }}
                            placeholder="Paste the job description here..."
                            rows="10"
                            className="w-full border rounded-md p-3"
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <p className="text-red-600 mb-4">
                            {error}
                        </p>

                    )}


                    {/* Button */}

                    <button
                        onClick={handleMatch}
                        disabled={loading || resumes.length === 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-md"
                    >

                        {loading
                            ? "Analyzing..."
                            : "Analyze Job Match"}

                    </button>

                </div>


                {/* Results */}

                {result && (

                    <div className="mt-8">

                        <h2 className="text-xl font-bold mb-5">
                            Job Match Results
                        </h2>


                        {/* Match Percentage */}

                        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">

                            <h3 className="font-semibold text-gray-700">
                                Match Percentage
                            </h3>

                            <p className="text-4xl font-bold text-blue-600 mt-2">
                                {result.matchPercentage}%
                            </p>

                        </div>


                        <div className="grid md:grid-cols-3 gap-6">


                            {/* Matched Skills */}

                            <div className="bg-white p-6 rounded-lg shadow">

                                <h3 className="font-bold text-green-600 mb-4">
                                    Matched Skills
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">

                                    {result.matchedSkills?.map(
                                        (skill, index) => (

                                            <li key={index}>
                                                {skill}
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>


                            {/* Missing Skills */}

                            <div className="bg-white p-6 rounded-lg shadow">

                                <h3 className="font-bold text-red-600 mb-4">
                                    Missing Skills
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">

                                    {result.missingSkills?.map(
                                        (skill, index) => (

                                            <li key={index}>
                                                {skill}
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>


                            {/* Recommendations */}

                            <div className="bg-white p-6 rounded-lg shadow">

                                <h3 className="font-bold text-blue-600 mb-4">
                                    Recommendations
                                </h3>

                                <ul className="list-disc pl-5 space-y-2">

                                    {result.recommendations?.map(
                                        (item, index) => (

                                            <li key={index}>
                                                {item}
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default JobMatch;