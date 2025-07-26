const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    bookTitle: String,
    authorName: String,
    category: String,
    bookCover: [String], // Array of image URLs
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Reference to seller
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("books", bookSchema);

module.exports = BookModel;
