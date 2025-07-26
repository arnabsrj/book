const SellerModel = require("../models/SellerModel");
const bcrypt = require("bcryptjs");

const sellerSignUp = async (req, res) => {
  try {
    let { name, email, password, phone, shopName, gstNumber } = req.body;

    // Trim inputs
    email = email?.trim().toLowerCase();
    name = name?.trim();
    phone = phone?.trim();
    shopName = shopName?.trim();
    gstNumber = gstNumber?.trim();

    if (!email || !password || !name || !phone || !shopName || !gstNumber) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be 8+ chars, with at least 1 uppercase and 1 number",
        success: false
      });
    }

    const existing = await SellerModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Seller already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new SellerModel({
      name,
      email,
      password: hashedPassword,
      phone,
      shopName,
      gstNumber,
      role: "SELLER"
    });

    await seller.save();

    return res.status(201).json({ message: "Seller registered", success: true, data: seller });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = sellerSignUp;
