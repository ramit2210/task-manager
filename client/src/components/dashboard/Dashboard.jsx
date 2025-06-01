import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { TodoContext } from "../../context/TodoContext";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { getTodos, loading } = useContext(TodoContext);

    useEffect(() => {
        getTodos();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {user ? `${user.username}'s Todo List` : "Todo List"}
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage your tasks efficiently
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <TodoForm />
                <TodoFilter />
                <TodoList />
            </div>
        </div>
    );
};

export default Dashboard;
