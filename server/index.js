require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (req, res) =>{
    res.send('Todo API is running');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});