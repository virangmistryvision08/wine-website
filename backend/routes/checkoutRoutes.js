// server/routes/payment.js
const express = require("express");
const Stripe = require("stripe");
const Orders = require("../model/orderModel");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { userId, email, amount, currency, deliveryDetails, cartProducts } = req.body;

    if (!userId) return res.status(400).json({ message: "Please Login!" });

    // Create a temporary order record in MongoDB (unpaid)
    const newOrder = await Orders.create({
      userId: new mongoose.Types.ObjectId(userId),
      email: email || "",
      deliveryDetails,
      cartProducts,
      amount,
      status: "pending",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      // or
      // payment_method_types: ["card"],
      metadata: {
        orderId: newOrder.orderId,
        userId: newOrder.userId.toString(),
        deliveryDetails: JSON.stringify(deliveryDetails),
      },

      // Store visible details
      description: `Order by ${deliveryDetails.firstName} ${deliveryDetails.lastName}`,
      receipt_email: email,

    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
