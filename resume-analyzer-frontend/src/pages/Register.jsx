import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../services/authService";

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await registerUser({
                email,
                password,
            });

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            console.log("REGISTER ERROR:", err);

            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Logo / Title */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Resume Analyzer
                    </h1>

                    <p className="text-slate-400 mt-2">
                        AI-powered resume analysis
                    </p>

                </div>

                {/* Register Card */}
                <div className="bg-white rounded-xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Create Account
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Register to start analyzing your resumes
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="mb-5">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Password */}
                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg
                                       font-semibold hover:bg-blue-700 transition"
                        >
                            Register
                        </button>

                    </form>

                    {/* Messages */}
                    {error && (
                        <p className="text-red-600 text-sm text-center mt-4">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-green-600 text-sm text-center mt-4">
                            {success}
                        </p>
                    )}

                    {/* Login Link */}
                    <div className="text-center mt-6">

                        <span className="text-gray-600">
                            Already have an account?{" "}
                        </span>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;