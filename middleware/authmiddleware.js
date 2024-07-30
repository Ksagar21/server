const jwt = require("jsonwebtoken");
const config = require("../config");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  jwt.verify(token.split(" ")[1], config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

exports.adminVerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  jwt.verify(token.split(" ")[1], config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    if (req.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Admin Authorization is required" });
    }
    next();
  });
};
