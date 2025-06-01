import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos, filteredTodos, loading } = useContext(TodoContext);

    const currentTodos = filteredTodos || todos;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (currentTodos.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">No todos to display</p>
                {filteredTodos && (
                    <p className="text-sm text-gray-500 mt-2">
                        Try a different filter or add new todos
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {currentTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
