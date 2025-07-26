const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shopName: { type: String, required: true, trim: true },
  gstNumber: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "SELLER" },
}, { timestamps: true });

module.exports = mongoose.model("Seller", SellerSchema);
