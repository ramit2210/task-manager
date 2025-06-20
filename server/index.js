require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models"); // Import sequelize instance from models

const app = express();

//Import routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Todo API is running");
});

//Function for database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        // Sync all models with the database
        await sequelize.sync();
        console.log("All models were synchronized successfully");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

// Call the function to connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
