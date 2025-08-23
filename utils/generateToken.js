const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { client } = require("../config/db");

router.get("/", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "key039r4e0trfg0", {
    expiresIn: "1h",
  });
  res.cookie("token", token).send({ status: true });
});

module.exports = router;
