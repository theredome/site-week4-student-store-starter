const orderModel = require("../Model/orderModel");

// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to get order by ID along with associated order items
const getOrderByID = async (req, res) => {
    try {
        const order = await orderModel.getOrderByID(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = await orderModel.createOrder(req.body);
        console.log(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to update an existing order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel.updateOrder(req.params.id, req.body);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete an existing order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderModel.deleteOrder(req.params.id);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to add items to an order
const addItemToOrder = async (req, res) => {
    try {
        const orderItem = await orderModel.addItemToOrder(req.params.order_id, req.body);
        res.status(201).json(orderItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to calculate the total price of an order
const getOrderTotal = async (req, res) => {
    try {
        const total = await orderModel.calculateOrderTotal(req.params.order_id);
        res.status(200).json({ total });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export all functions
module.exports = {
    getAllOrders,
    getOrderByID,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemToOrder,
    getOrderTotal
};
