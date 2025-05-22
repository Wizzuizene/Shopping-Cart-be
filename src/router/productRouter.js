const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/create-product", productController.createProduct);
router.get("/get-products", productController.getProducts);
router.get("/get-products/:id", productController.getProductsbyId);

router.put("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);


module.exports = router;

