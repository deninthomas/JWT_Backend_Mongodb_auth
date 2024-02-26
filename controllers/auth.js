const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");
const User = require("../models/User");
// const bodyParser = require("body-parser");
// const express = require("express");
// const app =express();


// app.use(bodyParser.json());

// Register a new user
const register = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ message: "Username already exists" });
    }
    if ( !username || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }
    const user = new User({ username,password: password });
    await user.save();
    console.log("Registration successful");
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.log("Error occurred while trying to create a user:", error);
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   console.log("Incorrect password");
    //   return res.status(401).json({ message: 'Incorrect password' });
    // }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    console.log("Login successful");
    res.json({ token });
  } catch (error) {
    console.log("Error occurred while trying to log in:", error);
    next(error);
  }
};

module.exports = { register, login };
