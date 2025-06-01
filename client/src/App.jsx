import React from "react";
import { AuthProvider } from "./context/authContext";
import { TodoProvider } from "./context/TodoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
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
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </TodoProvider>
        </AuthProvider>
    );
};

export default App;
