// client/src/context/TodoContext.js
import React, { createContext, useReducer } from "react";
import api from "../utils/api";

// Initial state
const initialState = {
    todos: [],
    filteredTodos: null,
    loading: true,
    error: null,
};

// Create context
export const TodoContext = createContext(initialState);

// Reducer function
const todoReducer = (state, action) => {
    switch (action.type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: action.payload,
                filteredTodos: null,
                loading: false,
            };
        case "GET_FILTERED_TODOS":
            return {
                ...state,
                filteredTodos: action.payload,
                loading: false,
            };
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload],
                loading: false,
            };
        case "UPDATE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                ),
                filteredTodos: state.filteredTodos
                    ? state.filteredTodos.map((todo) =>
                          todo.id === action.payload.id ? action.payload : todo
                      )
                    : null,
                loading: false,
            };
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
                filteredTodos: state.filteredTodos
                    ? state.filteredTodos.filter(
                          (todo) => todo.id !== action.payload
                      )
                    : null,
                loading: false,
            };
        case "TODO_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "CLEAR_FILTER":
            return {
                ...state,
                filteredTodos: null,
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
export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    // Get todos
    const getTodos = async () => {
        try {
            const res = await api.get("/todos");
            dispatch({
                type: "GET_TODOS",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload: err.response?.data?.message || "Failed to fetch todos",
            });
        }
    };

    // Filter todos by completion status
    const filterTodos = async (status) => {
        try {
            const res = await api.get(`/todos/filter?status=${status}`);
            dispatch({
                type: "GET_FILTERED_TODOS",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload:
                    err.response?.data?.message || "Failed to filter todos",
            });
        }
    };

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: "CLEAR_FILTER" });
    };

    // Add todo
    const addTodo = async (todo) => {
        try {
            const res = await api.post("/todos", todo);
            dispatch({
                type: "ADD_TODO",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload: err.response?.data?.message || "Failed to add todo",
            });
        }
    };

    // Update todo
    const updateTodo = async (id, todo) => {
        try {
            const res = await api.put(`/todos/${id}`, todo);
            dispatch({
                type: "UPDATE_TODO",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload: err.response?.data?.message || "Failed to update todo",
            });
        }
    };

    // Toggle todo completion
    const toggleTodo = async (id) => {
        try {
            const res = await api.put(`/todos/${id}/toggle`);
            dispatch({
                type: "UPDATE_TODO",
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload: err.response?.data?.message || "Failed to toggle todo",
            });
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            dispatch({
                type: "DELETE_TODO",
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: "TODO_ERROR",
                payload: err.response?.data?.message || "Failed to delete todo",
            });
        }
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: "CLEAR_ERROR" });
    };

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                filteredTodos: state.filteredTodos,
                loading: state.loading,
                error: state.error,
                getTodos,
                filterTodos,
                clearFilter,
                addTodo,
                updateTodo,
                toggleTodo,
                deleteTodo,
                clearError,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
