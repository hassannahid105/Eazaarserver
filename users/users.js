const express = require("express");
const router = express.Router();
const { client } = require("../config/db");

const userCollection = client.db("eazaar").collection("users");

router.post("/", async (req, res) => {
  const query = req.body;
  const result = await userCollection.insertOne(query);
  res.send(result);
});

module.exports = router;
