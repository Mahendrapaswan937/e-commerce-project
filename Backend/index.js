require("dotenv").config()

const productRoutes = require("./routes/productRoutes");
 

const express = require("express");

const connectDB = require("./config/db");

console.log(connectDB);
console.log(typeof connectDB);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("E-commerce Backend API Running...");
});
 

app.use("/products", productRoutes);

connectDB();


app.listen(8002, () => {
    console.log("Server is running on port 8002...");
});