const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");

// Get all orders
router.get("/", orderController.getAllOrders);

// Get order by ID
router.get("/:id", orderController.getOrderByID);

// Add a new order
router.post("/", orderController.createOrder);

// Update an existing order
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

// Add items to an existing order
router.post("/:order_id/items", orderController.addItemToOrder);

// Calculate order total
router.get("/:order_id/total", orderController.getOrderTotal);


module.exports = router;
