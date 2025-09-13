const express = require("express");
const router = express.Router();
const { client } = require("../config/db");
const { ObjectId } = require("mongodb");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const productCollection = client.db("eazaar").collection("products");

router.get("/", async (req, res) => {
  try {
    const result = await productCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.findOne(query);
  res.send(result);
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await productCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    categories,
    description,
    price,
    offerPrice,
    brand,
    stock,
    isFeatured,
    images,
    featureDes,
    discountType,
    color,
    tags,
    dimensions,
  } = req.body;
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      //
      name: name,
      categories: categories,
      description: description,
      price: price,
      offerPrice: offerPrice,
      brand: brand,
      stock: stock,
      isFeatured: isFeatured,
      images: images,
      featureDes: featureDes,
      color: color,
      tags: tags,
      discountType: discountType,
      dimensions: dimensions,
    },
  };
  const result = await productCollection.updateOne(query, updateDoc);
  res.send(result);
});
module.exports = router;
