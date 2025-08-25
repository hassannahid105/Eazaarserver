const express = require("express");
const router = express.Router();
const { client } = require("../config/db");

const userCollection = client.db("eazaar").collection("users");

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await userCollection.findOne({ email: user.email });

    if (existingUser) {
      return res.send({ message: "User already exists" });
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    //
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await userCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
