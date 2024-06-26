const express = require("express");
const router = express.Router();
const productController = require("../Controller/productController");

// Get all products
router.get("/", productController.getAllProducts);


// Get product by ID
router.get("/:id", productController.getProductByID);

// Add a new product
router.post("/", productController.createProduct);

// Update an existing product
router.put("/:id", productController.updateProduct);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
