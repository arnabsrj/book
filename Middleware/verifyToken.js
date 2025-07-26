const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
      success: false,
      error: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // This sets req.userId for use in route
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden: Invalid token",
      success: false,
      error: true,
    });
  }
};

module.exports = verifyToken;
