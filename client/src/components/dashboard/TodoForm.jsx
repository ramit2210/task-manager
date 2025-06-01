import React, { useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoForm = () => {
    const [todo, setTodo] = useState({
        title: "",
        description: "",
    });
    const [showForm, setShowForm] = useState(false);

    const { addTodo } = useContext(TodoContext);

    const { title, description } = todo;

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === "") return;

        addTodo(todo);
        setTodo({ title: "", description: "" });
        setShowForm(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Add New Todo
                </button>
            ) : (
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Todo Title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Todo Description"
                            name="description"
                            value={description}
                            onChange={onChange}
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Todo
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TodoForm;
