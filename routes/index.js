const express = require("express");
const router = express.Router();

// Middleware
const AuthToken = require("../Middleware/AuthToken");
const verifyToken = require("../Middleware/verifyToken");

// Controllers - User
const userSignUp = require("../controller/signup");
const userSignIn = require("../controller/signin");
const userDetails = require("../controller/userDetails");
const userLogout = require("../controller/logout");
const allUsers = require("../controller/allUser");
const updateUser = require("../controller/updateUser");
const deleteUser = require("../controller/deleteUser");
const editProfile = require("../controller/editprofile");

// Controllers - Seller
const sellerSignUp = require("../controller/SellerSignUp");
const sellerSignIn = require("../controller/sellerSignIn");
const getSellerBooks = require("../controller/getSellerBooks");

// Controllers - Book
const UploadBook = require("../controller/uploadbook");
const { getAllBooks } = require("../controller/getAllBooks");
const deleteBook = require("../controller/deleteBook");
const getBooksByCategory = require("../controller/getBookByCategory");
const getBookById = require("../controller/getBookById");

// Controllers - Cart
const { addToCart, getUserCart } = require("../controller/cartController");

// Controllers - Book Requests
const {
  requestBook,
  getUserRequests,
  cancelRequest,
} = require("../controller/requestController");

// ---------------- ROUTES ------------------- //

// 🔹 User Routes
router.post("/api/user/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/user-details", AuthToken, userDetails);
router.get("/user-logout", userLogout);
router.get("/all-user", AuthToken, allUsers);
router.put("/update-user", AuthToken, updateUser);
router.delete("/delete-user/:id", AuthToken, deleteUser);
router.put("/editprofile", AuthToken, editProfile);

// 🔹 Seller Routes
router.post("/signup", sellerSignUp);
router.post("/login", sellerSignIn);
router.get("/seller-books", verifyToken, getSellerBooks);

// 🔹 Book Routes
router.post("/uploadbook", AuthToken, UploadBook);
router.post("/upload-book", verifyToken, UploadBook); // (if both needed)
router.get("/getAllBooks", AuthToken, getAllBooks);
router.get("/getBookById/:id", getBookById);
router.get("/getBookByCategory/:category", getBooksByCategory);
router.delete("/delete-book/:id", AuthToken, deleteBook);

// 🔹 Cart Routes
router.post("/add", AuthToken, addToCart);
router.get("/", AuthToken, getUserCart);

// 🔹 Request Book Routes
router.post("/requestBook", requestBook);
router.get("/userRequests/:userEmail", getUserRequests);
router.delete("/cancelRequest/:requestId", cancelRequest);

module.exports = router;
