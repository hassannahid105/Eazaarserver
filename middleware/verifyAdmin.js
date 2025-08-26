const jwt = require("jsonwebtoken");
const { client } = require("../config/db");
const userCollection = client.db("eazaar").collection("users");
const verifyAdmin = async (req, res, next) => {
  try {
    const decodedEmail = req.user.email;
    const query = { email: decodedEmail };
    const user = await userCollection.findOne(query);
    console.log();
    if (!user || user.role !== "admin") {
      return res.status(401).send({ message: "Unauthorized - Not an admin" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = verifyAdmin;
