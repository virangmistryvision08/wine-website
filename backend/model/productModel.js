const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImage: { type: String },
    title: { type: String },
    verity: { type: String },
    isGold: { type: Boolean, default: false },
    price: { type: Number },
    productType: { type: String },
    wineType: { type: String },
    slug: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
