require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const app = express();
const port = +process.env.PORT;
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");

app.use(express.json());
app.use("/product", express.static("public"));

app.use("/product", products);
app.use("/auth", auth);

app.listen(port, () => {
  console.log("Server Started at PORT -", port);
});
