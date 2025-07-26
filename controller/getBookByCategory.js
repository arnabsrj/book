const Book = require('../models/BookModel');

const getBooksByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) {
            return res.status(400).json({ success: false, message: "Category is required" });
        }

        const books = await Book.find({ category: { $regex: `^${category}$`, $options: "i" } });

        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found for this category" });
        }

        res.status(200).json({ success: true, books });
    } catch (error) {
        console.error("Database error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = getBooksByCategory;
