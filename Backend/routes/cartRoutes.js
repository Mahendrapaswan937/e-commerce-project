const express = require("express");

const {
    addToCart,
    getCart,
    updateCart,
    removeCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:id", updateCart); 
router.delete("/:id", removeCart);

module.exports = router;