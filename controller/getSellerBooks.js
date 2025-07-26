const BookModel = require("../models/BookModel");

const getSellerBooks = async (req, res) => {
  try {
    const sellerId = req.userId;

    if (!sellerId) {
      return res.status(401).json({
        message: "Unauthorized: Seller ID missing",
        success: false,
        error: true,
      });
    }

    const books = await BookModel.find({ userId: sellerId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Books uploaded by the seller fetched successfully",
      success: true,
      error: false,
      data: books,
    });
  } catch (err) {
    console.error("Error fetching seller books:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = getSellerBooks;
