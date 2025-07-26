const UserModel = require("../models/UserModel");

async function deleteUser(req, res) {
    try {
        const { id } = req.params;  // Extract user ID from request params

        // Validate that the ID is provided
        if (!id) {
            return res.status(400).json({
                message: "Please provide a user ID.",
                success: false,
                error: true
            });
        }

        // Delete the user from the database
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        // Success response
        return res.status(200).json({
            message: "User deleted successfully",
            success: true,
            error: false
        });
    } catch (err) {
        // Error Handling
        return res.status(500).json({
            message: err.message || "Server error",
            success: false,
            error: true
        });
    }
}

module.exports = deleteUser;
