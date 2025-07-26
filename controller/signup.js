const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

async function userSignUp(req, res) {
  try {
    let { email, password, name } = req.body;

    // Trim and sanitize inputs
    email = email?.trim().toLowerCase();
    name = name?.trim();

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
        error: true,
      });
    }

    // Enforce strong password
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include one uppercase letter and one number",
        success: false,
        error: true,
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new UserModel({
      email,
      name,
      password: hashPassword,
      role: "GENERAL",
    });

    const savedUser = await newUser.save();

    // Return response
    return res.status(201).json({
      message: "User created successfully!",
      data: savedUser,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUp;
