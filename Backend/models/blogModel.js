const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    date: {
        type: String,
        default: new Date().toLocaleDateString()
    }
});

module.exports = mongoose.model("Blog", blogSchema);