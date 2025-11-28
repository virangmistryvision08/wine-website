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
    quantity: { type: Number, default: 1 },
    slug: { type: String },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
