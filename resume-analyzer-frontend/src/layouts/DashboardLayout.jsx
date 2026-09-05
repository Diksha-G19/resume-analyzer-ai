import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUpload, FaFileAlt, FaBriefcase, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-6">

                <h1 className="text-2xl font-bold mb-10">
                    Resume Analyzer
                </h1>

                <nav className="space-y-3">

                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
                    >
                        <FaHome />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/upload"
                        className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
                    >
                        <FaUpload />
                        Upload Resume
                    </NavLink>

                    <NavLink
                        to="/my-resumes"
                        className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
                    >
                        <FaFileAlt />
                        My Resumes
                    </NavLink>

                    <NavLink
                        to="/job-match"
                        className="flex items-center gap-3 p-3 rounded hover:bg-slate-700"
                    >
                        <FaBriefcase />
                        Job Match
                    </NavLink>


                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-10 flex items-center gap-3 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>

        </div>
    );
}

export default DashboardLayout;