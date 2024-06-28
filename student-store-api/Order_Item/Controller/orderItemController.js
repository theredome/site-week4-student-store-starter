const orderItemModel = require("../Model/orderItemModel");

// Function to get all order items
const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await orderItemModel.getAllOrderItems();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to get order item by ID
const getOrderItemByID = async (req, res) => {
    try {
        const orderItem = await orderItemModel.getOrderItemByID(req.params.id);
        if (orderItem) {
            res.status(200).json(orderItem);
        } else {
            res.status(404).json({ error: "Order item not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to create a new order item
const createOrderItem = async (req, res) => {
    try {
        const newOrderItem = await orderItemModel.createOrderItem(req.body);
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to update an existing order item
const updateOrderItem = async (req, res) => {
    try {
        const updatedOrderItem = await orderItemModel.updateOrderItem(req.params.id, req.body);
        if (updatedOrderItem) {
            res.status(200).json(updatedOrderItem);
        } else {
            res.status(404).json({ error: "Order item not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete an existing order item
const deleteOrderItem = async (req, res) => {
    try {
        const deletedOrderItem = await orderItemModel.deleteOrderItem(req.params.id);
        if (deletedOrderItem) {
            res.status(200).json(deletedOrderItem);
        } else {
            res.status(404).json({ error: "Order item not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Export all functions
module.exports = {
    getAllOrderItems,
    getOrderItemByID,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
};
