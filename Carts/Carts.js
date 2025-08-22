const express = require("express");
const router = express.Router();
const { client } = require("../config/db");

const cartCollection = client.db("eazaar").collection("carts");

router.post("/", async (req, res) => {
  //
  try {
    const data = req.body;
    const result = await cartCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    // const query = { email: email };
    const result = await cartCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
