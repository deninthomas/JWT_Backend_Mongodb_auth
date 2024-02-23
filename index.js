const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config({path:'./touch.env'}); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1); // Exit the application
}

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// In Other word server.js the entery point 