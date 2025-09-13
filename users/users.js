const express = require("express");
const router = express.Router();
const { client } = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

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
// ! verify admin
router.get("/admin/:email", verifyToken, async (req, res) => {
  try {
    const deEmail = req.user.email;

    const user = req.params.email;
    if (user !== deEmail) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // console.log("inside user for admin check", query);
    const query = { email: user };
    const isAdmin = await userCollection.findOne(query);
    if (isAdmin.role === "admin") {
      return res.send({ isAdmin: true });
    }
    res.send({ isAdmin: false });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
