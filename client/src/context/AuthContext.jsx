import React, { createContext, useReducer, useEffect } from "react";
import api from "../utils/api";

// Initial state
const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
};

// Create context
export const AuthContext = createContext(initialState);

// Reducer function
const authReducer = (state, action) => {
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
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // This useEffect handles loading the user when the component mounts or token changes
    useEffect(() => {
        const loadUser = async () => {
            if (localStorage.token) {
                // Check localStorage directly for the token
                try {
                    const res = await api.get("/auth/user");
                    dispatch({
                        type: "USER_LOADED",
                        payload: res.data,
                    });
                } catch (err) {
                    dispatch({
                        type: "AUTH_ERROR",
                        payload:
                            err.response?.data?.message ||
                            "Authentication failed",
                    });
                }
            } else {
                dispatch({ type: "AUTH_ERROR" }); // No token, so not authenticated
            }
        };

        // Only call loadUser if we are not authenticated yet and a token might exist
        // or if we are loading and a token exists.
        // This prevents redundant calls after login/register success
        if (
            !state.isAuthenticated &&
            (state.token || localStorage.getItem("token"))
        ) {
            loadUser();
        }
    }, [state.isAuthenticated, state.token]);

    // Register user
    const register = async (formData) => {
        try {
            console.log(formData);
            const res = await api.post("/auth/register", formData);
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "REGISTER_FAIL",
                payload: err.response?.data?.message || "Registration failed",
            });
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const res = await api.post("/auth/login", formData);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "LOGIN_FAIL",
                payload: err.response?.data?.message || "Login failed",
            });
        }
    };

    // Logout
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    // Clear errors
    const clearError = () => {
        dispatch({ type: "CLEAR_ERROR" });
    };

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
};
