import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { TodoContext } from "../../context/TodoContext";

const Alert = () => {
    const { error: authError, clearError: clearAuthError } =
        useContext(AuthContext);
    const { error: todoError, clearError: clearTodoError } =
        useContext(TodoContext);

    const error = authError || todoError;

    if (!error) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button
                onClick={() => {
                    if (authError) clearAuthError();
                    if (todoError) clearTodoError();
                }}
                className="text-red-700 font-bold"
            >
                &times;
            </button>
        </div>
    );
};

export default Alert;
