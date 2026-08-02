const express = require("express");
const router = express.Router();

const Blog = require("../models/blogModel");

// ================= GET ALL BLOGS =================
router.get("/", async (req, res) => {
    try {

        const blogs = await Blog.find();

        res.status(200).json(blogs);

    } catch (error) {

        console.error("Blog loading error:", error);

        res.status(500).json({
            message: "Failed to load blogs"
        });
    }
});


// ================= ADD BLOG =================
router.post("/", async (req, res) => {
    try {

        const { title, description, image, date } = req.body;

        const blog = new Blog({
            title,
            description,
            image,
            date
        });

        const savedBlog = await blog.save();

        res.status(201).json(savedBlog);

    } catch (error) {

        console.error("Blog creation error:", error);

        res.status(500).json({
            message: "Failed to create blog"
        });
    }
});


module.exports = router;