const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    res.send(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "key039r4e0trfg0");
    // console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
