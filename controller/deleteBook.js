const BookModel = require("../models/BookModel");

async function deleteBook(req, res) {
    try {
        const { id } = req.params;  // Get book ID from URL params

        if (!id) {
            return res.status(400).json({
                message: "Please provide a book ID.",
                success: false,
                error: true
            });
        }

        // Find and delete the book
        const deletedBook = await BookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found",
                success: false,
                error: true
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully",
            success: true,
            error: false
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Server error",
            success: false,
            error: true
        });
    }
}

module.exports = deleteBook;
