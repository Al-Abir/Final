import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(authStatus === "true");
    }, []);

    const handleAuth = () => {
        if (isLoggedIn) {
            localStorage.removeItem("isLoggedIn"); // Remove login state
            setIsLoggedIn(false);
            navigate("/login"); // Redirect to login page
        } else {
            navigate("/login"); // Redirect to login
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Abir Sheikh</h1>
                <button
                    onClick={handleAuth}
                    className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition mr-6"
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </button>
            </div>
        </nav>
    );
};

export default AdminHeader;
