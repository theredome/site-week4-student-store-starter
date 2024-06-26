const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");

// Get all orders
router.get("/", orderController.getAllOrders);

// Get order by ID along with associated order items
router.get("/:id", orderController.getOrderByID);

// Add a new order
router.post("/", orderController.createOrder);

// Update an existing order
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
