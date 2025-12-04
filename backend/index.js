require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const app = express();
const port = +process.env.PORT;
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const cart = require("./routes/cartRoutes");
const blog = require("./routes/blogRoutes");
const checkout = require("./routes/checkoutRoutes");
const cors = require("cors");
const stripeWebhook = require("./routes/stripeWebhook");

app.use("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(cors());
app.use(express.json());
app.use("/product", express.static("public"));

app.use("/product", products);
app.use("/auth", auth);
app.use("/cart", cart);
app.use("/blog", blog);
app.use("/checkout", checkout);

app.listen(port, () => {
  console.log("Server Started at PORT -", port);
});
