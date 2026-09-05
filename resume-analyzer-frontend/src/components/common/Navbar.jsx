import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar({ title }) {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        // Clear resume analysis stored for current session
        sessionStorage.clear();

        // Logout user
        logout();

        // Go to login page
        navigate("/");
    };

    return (
        <header className="flex justify-between items-center bg-white rounded-lg shadow-sm px-8 py-4">

            <h2 className="text-xl font-semibold text-gray-800">
                {title}
            </h2>

            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
                Logout
            </button>

        </header>
    );
}

export default Navbar;