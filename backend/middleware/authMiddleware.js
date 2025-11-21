const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token  error:", error.message);
    res.status(401).json({ message: "expired token" });
  }
};

module.exports = authMiddleware;
