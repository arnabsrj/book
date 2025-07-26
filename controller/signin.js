const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required", 
                error: true, 
                success: false 
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                message: "User not found", 
                error: true, 
                success: false 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid password", 
                error: true, 
                success: false 
            });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "8h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 8 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            success: true,
            error: false
        });

    } catch (err) {
        console.error("SignIn Error:", err);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: true, 
            success: false 
        });
    }
};

module.exports = userSignIn;
