import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyResumes from "./pages/MyResumes";
import UploadResume from "./pages/UploadResume";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobMatch from "./pages/JobMatch";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<UploadResume />} />
                <Route path="/my-resumes" element={<MyResumes />} />
                <Route path="/analysis/:id" element={<ResumeAnalysis />} />
                <Route path="/job-match" element={<JobMatch />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;