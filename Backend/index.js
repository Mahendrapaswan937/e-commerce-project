const productRoutes = require("./routes/productRoutes");

const products = require("./data/products");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("E-commerce Backend API Running...");
});
 

app.use("/products", productRoutes);


app.listen(8002, () => {
    console.log("Server is running on port 8002...");
});