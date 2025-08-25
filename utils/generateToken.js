const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = req.body;
  // console.log(user);
  const token = jwt.sign(user, "key039r4e0trfg0", {
    expiresIn: "1h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    })
    .send({ status: true });
});

module.exports = router;
