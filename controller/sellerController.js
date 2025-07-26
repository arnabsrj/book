const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");

const updateSellerProfile = async (req, res) => {
  const {
    sellerId,
    name,
    shopName,
    gstNumber,
    phone,
    email,
    password,
    role,
  } = req.body;

  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    // Update fields
    if (name) seller.name = name;
    if (shopName) seller.shopName = shopName;
    if (gstNumber) seller.gstNumber = gstNumber;
    if (phone) seller.phone = phone;
    if (email) seller.email = email;
    if (role) seller.role = role;

    // Check if password is being updated
    if (password && !(await bcrypt.compare(password, seller.password))) {
      const salt = await bcrypt.genSalt(10);
      seller.password = await bcrypt.hash(password, salt);
    }

    await seller.save();

    return res.status(200).json({
      success: true,
      message: "Seller profile updated successfully",
      seller,
    });
  } catch (err) {
    console.error("Update Seller Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateSellerProfile };
