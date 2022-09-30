require("dotenv").config();
require("./database/connection");
const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoutes = require("../routes/user");
const productRoutes = require("../routes/product");
const orderRoutes = require("../routes/order");
const categoryRoutes = require("../routes/category");
const cartRoutes = require("../routes/cart");

const app = express();
app.use(cors());
const staticDir = path.join(__dirname, "../public");
app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", productRoutes);
app.use(userRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
module.exports = app;
