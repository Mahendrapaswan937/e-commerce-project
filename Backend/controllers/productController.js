const products = require("../data/products");

const getProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find((item) => item.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
};

module.exports = {
    getProducts,
    getProductById
};