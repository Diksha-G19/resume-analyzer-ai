import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import PageTitle from "../components/common/PageTitle";
import { analyzeResume } from "../services/analysisService";

function ResumeAnalysis() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) {
            return;
        }

        const storageKey = `resumeAnalysis_${id}`;

        // Check if analysis already exists in current session
        const storedAnalysis = sessionStorage.getItem(storageKey);

        if (storedAnalysis) {

            console.log("Using saved analysis for resume ID:", id);

            setAnalysis(JSON.parse(storedAnalysis));
            setLoading(false);

            return;
        }

        const fetchAnalysis = async () => {

            try {

                setLoading(true);
                setError("");

                console.log("Analyzing resume ID:", id);

                const data = await analyzeResume(id);

                console.log("Analysis response:", data);

                // Store analysis for current session
                sessionStorage.setItem(
                    storageKey,
                    JSON.stringify(data)
                );

                setAnalysis(data);

            } catch (error) {

                console.error("ANALYSIS ERROR:", error);

                setError("Unable to analyze this resume.");

            } finally {

                setLoading(false);

            }
        };

        fetchAnalysis();

    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar title="Resume Analysis" />

                <div className="mt-8">
                    <p>Analyzing resume...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar title="Resume Analysis" />

                <div className="mt-8">
                    <p className="text-red-600">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar title="Resume Analysis" />

            <div className="mt-8">

                <PageTitle
                    title="Resume Analysis"
                    subtitle="AI-powered resume insights"
                />

                {analysis && (
                    <div className="grid md:grid-cols-3 gap-6">

                        {/* Strengths */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="font-bold text-green-600 mb-4">
                                Strengths
                            </h2>

                            <ul className="list-disc pl-5 space-y-2">
                                {analysis.strengths?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="font-bold text-red-600 mb-4">
                                Weaknesses
                            </h2>

                            <ul className="list-disc pl-5 space-y-2">
                                {analysis.weaknesses?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="font-bold text-blue-600 mb-4">
                                Suggestions
                            </h2>

                            <ul className="list-disc pl-5 space-y-2">
                                {analysis.suggestions?.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                )}

            </div>
        </>
    );
}

export default ResumeAnalysis;