import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add authorization tokens or other custom headers here
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error("Unauthorized access - redirecting to login.");
        }
        return Promise.reject(error);
    }
);

export default api;
