const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function that returns all orders
const getAllOrders = async () => {
    return prisma.order.findMany({
        include: { Order_Items: true }
    });
};

// Function that returns order by ID
const getOrderByID = async (id) => {
    return prisma.order.findUnique({
        where: { order_id: parseInt(id) },
        include: { Order_Items: true } // Include related order items
    });
};

// Function to create a new order
const createOrder = async (orderData) => {
    return prisma.order.create({ data: orderData });
};

// Function to update an existing order
const updateOrder = async (id, orderData) => {
    return prisma.order.update({
        where: { order_id: parseInt(id) },
        data: orderData
    });
};

// Function to delete an existing order
const deleteOrder = async (id) => {
    return prisma.order.delete({ where: { order_id: parseInt(id) } });
};

// Export all functions
module.exports = {
    getAllOrders,
    getOrderByID,
    createOrder,
    updateOrder,
    deleteOrder
};
