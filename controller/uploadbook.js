const uploadbookPermission = require("../helpers/permission");
const BookModel = require("../models/BookModel");

async function Uploadbook(req, res) {
  try {
    const sessionUserId = req.userId; // from token (middleware like verifyToken)

    if (!uploadbookPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Add userId (seller's ID) to the book data
    const newBook = new BookModel({
      ...req.body,
      userId: sessionUserId,
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book uploaded successfully",
      error: false,
      success: true,
      data: savedBook,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || "Upload failed",
      error: true,
      success: false,
    });
  }
}

module.exports = Uploadbook;
