const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    products: Array,
    totalAmount: Number,
    address: String,
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Order", orderSchema);