import React from "react";
import { AuthProvider } from "./context/authContext";
import { TodoProvider } from "./context/todoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
const App = () => {
    return (
        <AuthProvider>
            <TodoProvider>
                <BrowserRouter>
                    <div className="min-h-screen bg-gray-100">
                        <Navbar />
                        <div className="container mx-auto p-4">
                            <Routes>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </TodoProvider>
        </AuthProvider>
    );
};

export default App;
