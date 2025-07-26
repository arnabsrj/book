const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SellerModel = require("../models/SellerModel");

const sellerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        error: true,
      });
    }

    // ✅ Check if seller exists
    const seller = await SellerModel.findOne({ email });
    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
        success: false,
        error: true,
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
        error: true,
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      {
        _id: seller._id,
        email: seller.email,
        role: "SELLER",
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    // ✅ Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    // ✅ Send response
    return res.status(200).json({
      message: "Login successful",
      success: true,
      error: false,
      data: {
        token,
        seller: {
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          businessName: seller.businessName,
        },
      },
    });
  } catch (error) {
    console.error("Seller Login Error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = sellerSignIn;
