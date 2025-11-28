const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Unauthor User!" });
  }
};

module.exports = authorize;
