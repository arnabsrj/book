const BookModel = require("../models/BookModel");

const getBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ success: true, book });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getBookById;
