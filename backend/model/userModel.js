const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },

    // LINKED CART ID
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
      default: null,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
