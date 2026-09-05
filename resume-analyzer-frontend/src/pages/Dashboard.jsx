import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";
import PageTitle from "../components/common/PageTitle";
import StatCard from "../components/common/StatCard";
import { getMyResumes } from "../services/resumeService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalResumes: 0,
        latestResume: null
    });

    const [loading, setLoading] = useState(true);

    // Get logged-in user's email from JWT
    const token = localStorage.getItem("token");

    let userEmail = "User";

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            userEmail = payload.sub || "User";
        } catch (error) {
            console.error("Unable to read user information:", error);
        }
    }

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const resumes = await getMyResumes();

                setDashboard({
                    totalResumes: resumes.length,
                    latestResume:
                        resumes.length > 0
                            ? resumes[0]
                            : null
                });

            } catch (error) {

                console.error("DASHBOARD ERROR:", error);

                setDashboard({
                    totalResumes: 0,
                    latestResume: null
                });

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, []);

    return (
        <>
            <Navbar title="Dashboard" />

            <div className="mt-8">

                <PageTitle
                    title="Dashboard"
                    subtitle="Welcome to Resume Analyzer AI"
                />

                {/* Profile / Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Welcome 👋
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {userEmail}
                    </p>

                </div>


                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <StatCard
                        title="Uploaded Resumes"
                        value={
                            loading
                                ? "..."
                                : dashboard.totalResumes
                        }
                    />

                    <StatCard
                        title="Latest Resume"
                        value={
                            loading
                                ? "..."
                                : dashboard.latestResume
                                    ? dashboard.latestResume.fileName
                                    : "No Resume"
                        }
                    />

                </div>


                {/* Account Information */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Account Information
                    </h2>

                    <div className="space-y-3">

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-medium text-gray-800">
                                {userEmail}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Resumes
                            </p>

                            <p className="font-medium text-gray-800">
                                {loading
                                    ? "..."
                                    : dashboard.totalResumes}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;