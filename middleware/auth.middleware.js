const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

module.exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id; // Add user ID to request object
    next(); // Pass control to the next middleware or route
  } catch (err) {
    console.error("Error in Auth middleware:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
