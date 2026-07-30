require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes"); // Baad me banayenge
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("E-commerce Backend API Running...");
});
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
// app.use("/orders", orderRoutes);

app.listen(8002, () => {
    console.log("Server is running on port 8002...");
});