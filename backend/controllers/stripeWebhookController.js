const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const Orders = require("../model/orderModel");
const Carts = require("../model/cartModel");

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      try {
        const userId = paymentIntent.metadata?.userId;
        const orderId = paymentIntent.metadata?.orderId;
        if (!orderId) throw new Error("Order ID not found in metadata");

        const order = await Orders.findOne({ orderId });
        if (!order) throw new Error("Order not found in database");

        order.status = "paid";
        order.paymentIntentId = paymentIntent.id;
        await order.save();

        if (userId) {
          const objectId = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;

          if (objectId) {
            await Carts.findOneAndUpdate(
              { userId: objectId },
              { $set: { items: [] } },
              { new: true, upsert: true }
            );
          } else {
            console.warn(`Invalid userId format: ${userId}`);
          }
        }

        console.log(`Order ${orderId} marked as paid`);
      } catch (err) {
        console.error("Webhook handling error:", err.message);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
