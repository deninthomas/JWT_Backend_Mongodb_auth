const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config({path:'./touch.env'}); // Load environment variables
// const bodyparser = require('body-parser');

const app = express();
const PORT = process.env.PORT ;

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1); // Exit the application // unhandled Rejection waring
}

// Connect to MongoDB
connectDB();

// // Parse JSON request body
app.use(express.json());
// app.use (bodyparser.json());

// Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// In Other word server.js the entery point 