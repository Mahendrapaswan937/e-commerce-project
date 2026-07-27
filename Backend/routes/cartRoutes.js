const express = require("express");

const {
  addToCart,
  getCart,
  removeCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeCart);

module.exports = router;