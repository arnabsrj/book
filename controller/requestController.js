const Request = require("../models/RequestModel");
const requestBook = async (req, res) => {
    try {
        const { userName, userEmail, bookId } = req.body;

        if (!userEmail || !bookId) {
            return res.status(400).json({ message: "Missing required fields: userEmail and bookId are required." });
        }

        const newRequest = new Request({
            userName: userName || "Guest", // Default value
            userEmail,
            bookId,
            status: "Pending",
        });

        await newRequest.save();

        return res.status(201).json({ success: true, message: "Book request submitted successfully!" });
    } catch (error) {
        console.error("Error in requestBook:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const getUserRequests = async (req, res) => {
    try {
        const { userEmail } = req.params;
        const requests = await Request.find({ userEmail }).populate("bookId");
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const cancelRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        await Request.findByIdAndDelete(requestId);
        res.json({ success: true, message: "Request cancelled" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { requestBook, getUserRequests, cancelRequest };
