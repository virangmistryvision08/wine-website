const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },
    guestId: { type: String, default: null },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;
