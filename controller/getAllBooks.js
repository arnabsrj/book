const BookModel = require("../models/BookModel");

async function getAllBooks(req, res) {
  try {
    const books = await BookModel.find()
      .select("bookTitle authorName category createdAt bookCover userId")
      .populate({
        path: "userId",
        model: "Seller", // ✅ Must match the model name from mongoose.model("Seller", ...)
        select: "name email shopName phone", // ✅ Pick the seller fields you want to include
      })
      .sort({ createdAt: -1 }); // Optional: newest first

    res.json({
      message: "All Books Retrieved Successfully",
      data: books,
      totalBooks: books.length,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({
      message: err.message || "Error fetching books",
      error: true,
      success: false,
    });
  }
}

module.exports = { getAllBooks };
