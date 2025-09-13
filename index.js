const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const carts = require("./Carts/Carts");
const generateToken = require("./utils/generateToken");
const users = require("./users/users");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000 || process.env.PORT;
// Middle ware
app.use(express.json());
app.use(
  cors({
    // ? TODO: change origin later
    origin: [
      "*",
      "https://my-project-18d49.web.app",
      "https://my-project-18d49.firebaseapp.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // If using cookies/auth
  })
);
app.use(cookieParser());
// Connect to DB (only once)
connectToDB().then(() => console.log("✅ Connected to DB"));

//  ? product routes api
app.use("/products", productRoutes);
app.use("/carts", carts);
app.use("/generateToken", generateToken);
app.use("/users", users);

// ? test api
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("listen");
});
// Export app for Vercel
// TODO: open vercels
module.exports = app;
