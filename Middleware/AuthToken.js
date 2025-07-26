const jwt = require('jsonwebtoken');

async function AuthToken(req, res, next) {
    try {
        // Extract the token from cookies
        const token = req.cookies?.token;

        console.log("token", token);

        // If token is missing, respond with a message
        if (!token) {
            return res.status(200).json({ // Consider changing to 401/403 for authentication errors
                message: "Please Login...!",
                error: true,
                success: false,
            });
        }

        // Verify the token using the secret key
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            console.log(err); // Log any error for debugging
            console.log("decoded", decoded); // Log the decoded token

            if (err) {
                console.log("error auth", err); // Log the error (e.g., token expired)
                // You might want to return an explicit error response here
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                });
            }

            // If token is valid, set req.userId for further use
            req.userId = decoded?._id;

            // Proceed to the next middleware or route
            next();
        });
    } catch (err) {
        // Handle unexpected errors
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = AuthToken;
