require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token is missing!" });
  }
  const isValid = jwt.verify(token, "MYSECRETKEY", (err, decoded) => {
    if (err) {
      return res.json({ message: "Token has expired or damaged!" });
    }
    req.isAdmin = decoded.isAdmin;
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken,
};
