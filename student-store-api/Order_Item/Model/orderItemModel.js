const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function that returns all order items
const getAllOrderItems = async () => {
    return prisma.order_Item.findMany();
};

// Function that returns order item by ID
const getOrderItemByID = async (id) => {
    return prisma.order_Item.findUnique({ where: { order_item_id: parseInt(id) } });
};

// Function to create a new order item
const createOrderItem = async (orderItemData) => {
    return prisma.order_Item.create({ data: orderItemData });
};

// Function to update an existing order item
const updateOrderItem = async (id, orderItemData) => {
    return prisma.order_Item.update({
        where: { order_item_id: parseInt(id) },
        data: orderItemData
    });
};

// Function to delete an existing order item
const deleteOrderItem = async (id) => {
    return prisma.order_Item.delete({ where: { order_item_id: parseInt(id) } });
};

// Export all functions
module.exports = {
    getAllOrderItems,
    getOrderItemByID,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
};
