const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add-to-cart", cartController.addToCart);
router.get("/get-cart/:id", cartController.getCart);
router.post("/update-cart", cartController.updateCart);
router.post("/remove-item-from-cart", cartController.removeItemFromCart);

module.exports = router;
