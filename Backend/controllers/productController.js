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

const addProduct = (req, res) => {
    console.log("BODY:", req.body);

    const newProduct = req.body;

    products.push(newProduct);

    console.log("PRODUCTS:", products);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
};

const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find((item) => item.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.json({
        message: "Product updated successfully",
        product: product
    });
};


const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    const productIndex = products.findIndex(
        (item) => item.id === productId
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};