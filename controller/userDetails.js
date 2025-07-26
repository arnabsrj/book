const userModel = require("../models/UserModel");

async function userDetails(req, res) {
  try {
    // Check if req.userId is provided
    if (!req.userId) {
      throw new Error("User ID is missing from the request");
    }

    console.log("userId", req.userId);

    // Query user details
    const user = await userModel.findById(req.userId);

    // If user not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Respond with user data
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details retrieved successfully",
    });

    console.log("user", user);

  } catch (err) {
    // Handle errors
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetails;
