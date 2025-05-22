const express = require("express");
const app = express();
const authRouter = require("./src/router/authRouter");
const productRouter = require("./src/router/productRouter");
const cartRouter = require("./src/router/cartRouter");
// Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Import Routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
// Export app for server.js
module.exports = app;
