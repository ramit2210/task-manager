import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

const TodoFilter = () => {
    const { filterTodos, clearFilter, filteredTodos } = useContext(TodoContext);

    const onFilter = (status) => {
        if (filteredTodos && filteredTodos.length === 0 && status === "all") {
            clearFilter();
        } else {
            filterTodos(status);
        }
    };

    return (
        <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm">
                <button
                    onClick={() => clearFilter()}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-l-lg hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500"
                >
                    All
                </button>
                <button
                    onClick={() => onFilter("pending")}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border-t border-b border-blue-300 hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500"
                >
                    Pending
                </button>
                <button
                    onClick={() => onFilter("completed")}
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-r-lg hover:bg-blue-50 focus:z-10 focus:ring-2 focus:ring-blue-500"
                >
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoFilter;
