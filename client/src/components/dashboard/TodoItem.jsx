import React, { useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoItem = ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState({
        title: todo.title,
        description: todo.description,
    });

    const { deleteTodo, updateTodo, toggleTodo } = useContext(TodoContext);

    const { title, description } = editedTodo;

    const onChange = (e) => {
        setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === "") return;

        updateTodo(todo.id, editedTodo);
        setIsEditing(false);
    };

    const onToggle = () => {
        toggleTodo(todo.id);
    };

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                todo.isCompleted ? "border-green-500" : "border-blue-500"
            }`}
        >
            {isEditing ? (
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-1"
                            htmlFor={`title-${todo.id}`}
                        >
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={`title-${todo.id}`}
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-1"
                            htmlFor={`description-${todo.id}`}
                        >
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={`description-${todo.id}`}
                            name="description"
                            value={description}
                            onChange={onChange}
                            rows="2"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex items-start">
                        <div className="mr-2">
                            <input
                                type="checkbox"
                                checked={todo.isCompleted}
                                onChange={onToggle}
                                className="h-5 w-5 text-blue-600 rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <h3
                                className={`text-lg font-semibold ${
                                    todo.isCompleted
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                }`}
                            >
                                {todo.title}
                            </h3>
                            {todo.description && (
                                <p
                                    className={`mt-1 text-sm ${
                                        todo.isCompleted
                                            ? "line-through text-gray-400"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {todo.description}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                                Created:{" "}
                                {new Date(todo.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
