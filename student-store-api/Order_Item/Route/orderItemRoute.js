const express = require("express");
const router = express.Router();
const orderItemController = require("../Controller/orderItemController");

// Get all order items
router.get("/", orderItemController.getAllOrderItems);

// Get order item by ID
router.get("/:id", orderItemController.getOrderItemByID);

// Add a new order item
router.post("/", orderItemController.createOrderItem);

// Update an existing order item
router.put("/:id", orderItemController.updateOrderItem);

// Delete an order item
router.delete("/:id", orderItemController.deleteOrderItem);

module.exports = router;
