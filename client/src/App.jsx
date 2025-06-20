import React from "react";
import { AuthProvider } from "./context/authContext";
import { TodoProvider } from "./context/TodoContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <TodoProvider>
                <BrowserRouter>
                    <div className="min-h-screen bg-gray-100">
                        <Navbar />
                        <div className="container mx-auto p-4">
                            <Alert />
                            <Routes>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <PrivateRoute>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={<Navigate to="/dashboard" />}
                                />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </TodoProvider>
        </AuthProvider>
    );
};

export default App;
