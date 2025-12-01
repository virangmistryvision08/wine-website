const express = require("express");
const { add_to_cart, initGuestCart, mergeGuestCart, convertToGuestCart, updateQuantity } = require("../controllers/cartController");
const authorize = require("../authorization/authorize");
const router = express.Router();

// router.post("/guest/init", initGuestCart);
router.post("/add", authorize, add_to_cart);
// router.post("/merge", authorize, mergeGuestCart);
router.post("/convert-to-guest", convertToGuestCart);
router.post("/update-qty", authorize, updateQuantity);

module.exports = router;