const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function protectRoute(req, res, next) {
    try {
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ message: "Unauthorized: Token not found" });
        }
        const token = req.cookies.jwt;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Fetch user details from the database, excluding password
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (e) {
        console.error("Error in protectRoute middleware: ", e.message);

        // Handle specific JWT errors
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        } else if (e.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // General error response
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = protectRoute;
