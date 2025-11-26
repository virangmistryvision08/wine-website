const express = require("express");
const { create_product, get_all_products, get_filtered_products, get_single_product } = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/products");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

router.post("/create-product", upload.single("productImage"), create_product);
router.get("/get-all-products", get_all_products);
router.get("/get-filtered-products", get_filtered_products);
router.get("/get-single-product/:id", get_single_product);

module.exports = router;