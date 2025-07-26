const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
