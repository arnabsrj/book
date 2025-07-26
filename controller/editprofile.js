const UserModel = require("../models/UserModel");
const multer = require("multer");

// Configure multer for image upload
const upload = multer({ dest: "uploads/" });

const editprofile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone } = req.body;
        let profilePic = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Update user details
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, phone, ...(profilePic && { profilePic }) },
            { new: true }
        ).select("-password");

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = editprofile;
