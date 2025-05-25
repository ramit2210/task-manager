import React, { createContext, useReducer, useEffect } from "react";
import api from "../utils/api";
import { use } from "react";

// Initial state
const intialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
};

// Creating context
export const AuthContext = createContext(intialState);

function authReducer(state, action) {
    switch (action.type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case "AUTH_ERROR":
        case "REGISTER_FAIL":
        case "LOGIN_FAIL":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, intialState);

    //Load user data when user logs in
    useEffect(() => {
        loadUser();
    }, [state.token]);

    async function loadUser() {
        try {
            const res = await api.get("/auth/user");
            dispatch({
                type: "USER_LOADED",
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: "AUTH_ERROR" });
        }
    }

    async function register(formData) {
        try {
            const res = await api.get("/auth/register", formData);

            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data,
            });

            // Load user after registration
            loadUser();
        } catch (error) {
            dispatch({
                type: "REGISTER_FAIL",
                payload: error.response?.data?.message || "Registration failed",
            });
        }
    }

    async function login(formData) {
        try {
            const res = await api.get("/auth/login", formData);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data,
            });

            // Load user after login
            loadUser();
        } catch (error) {
            dispatch({
                type: "LOGIN_FAIL",
                payload: error.response?.data?.message || "Login Fail",
            });
        }
    }

    function logout() {
        dispatch({ type: "LOGOUT" });
    }

    function clearError() {
        dispatch({ type: "CLEAR_ERROR" });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
