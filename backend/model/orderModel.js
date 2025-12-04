const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  orderId: {
    type: String,
    unique: true,
  },
  email: String,
  deliveryDetails: Object,
  cartProducts: Array,
  amount: Number,
  paymentIntentId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model("Orders").countDocuments();
    this.orderId = `ORD-${new Date().getFullYear()}-Time(ms):-${String(Date.now())}-${String(
      count + 1
    ).padStart(5, "0")}`;
  }
  next();
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
