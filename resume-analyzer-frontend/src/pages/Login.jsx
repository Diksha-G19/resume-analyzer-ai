import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser({
                email,
                password,
            });

            console.log("SUCCESS:", response);

            login(response.token);

            navigate("/dashboard");

        } catch (err) {
            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response);

            if (err.response) {
                console.log(err.response.data);
            }

            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Resume Analyzer AI
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Analyze your resume and improve your career profile
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Login
                    </h2>

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
                                           focus:outline-none focus:ring-2 focus:ring-blue-500
                                           focus:border-transparent"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5">
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
                                           focus:outline-none focus:ring-2 focus:ring-blue-500
                                           focus:border-transparent"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200
                                            text-red-600 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg
                                       font-medium hover:bg-blue-700 transition"
                        >
                            Login
                        </button>

                    </form>

                    {/* Register */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:text-blue-700"
                        >
                            Register here
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;