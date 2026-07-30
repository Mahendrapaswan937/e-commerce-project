const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);

        res.status(201).json({
            message: "Product Added To Cart",
            cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.find();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Cart Item
const removeCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item Removed From Cart"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        res.json({
            message: "Cart Updated Successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCart
};