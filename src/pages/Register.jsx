import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({
        displayName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signup(userData.displayName, userData.email, userData.password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center">Register</h3>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mt-4">
                        <div className="mb-4">
                            <label className="block" htmlFor="displayName">
                                Username
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                id="displayName"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                value={userData.displayName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                                Register
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <p>You already have an account?</p>
                            <Link
                                to="/login"
                                className="text-blue-600 underline"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
