const express = require("express");
const { add_to_cart, convertToGuestCart, updateQuantity, get_carts, remove_from_cart } = require("../controllers/cartController");
const authorize = require("../authorization/authorize");
const router = express.Router();

router.post("/add", authorize, add_to_cart);
router.post("/convert-to-guest", convertToGuestCart);
router.post("/update-quantity", authorize, updateQuantity);
router.get("/get-carts", authorize, get_carts);
router.delete("/remove-cart", authorize, express.json(), remove_from_cart);

module.exports = router;