const express = require("express");
const router = express.Router();
const { client } = require("../config/db");
const verifyToken = require("../middleware/verifyToken");

const cartCollection = client.db("eazaar").collection("carts");

router.post("/", async (req, res) => {
  //
  try {
    const data = req.body;
    const token = req.cookies;
    console.log(token);
    const result = await cartCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = req.user.email;
    const query = { userEmail: user };
    const result = await cartCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
