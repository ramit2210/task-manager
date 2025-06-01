import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <div className="flex items-center">
            {user && (
                <span className="text-white mr-4">
                    Welcome, <span className="font-bold">{user.username}</span>
                </span>
            )}
            <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
                Logout
            </button>
        </div>
    );

    const guestLinks = (
        <div className="flex">
            <Link
                to="/register"
                className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-1 px-3 rounded mr-2"
            >
                Register
            </Link>
            <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded"
            >
                Login
            </Link>
        </div>
    );

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">
                    TodoApp
                </Link>
                <div>{isAuthenticated ? authLinks : guestLinks}</div>
            </div>
        </nav>
    );
};

export default Navbar;
