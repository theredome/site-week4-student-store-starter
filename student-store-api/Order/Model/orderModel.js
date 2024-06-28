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
    console.log(orderData);
    return prisma.order.create({ data: 
        {
            customer_id:     parseInt(orderData.customer_id),  
            total_price:    0,
            status:        orderData.status
        }
     });
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


// Function to add items to an order
const addItemToOrder = async (order_id, itemData) => {
    const product = await prisma.product.findUnique({where: {id: parseInt(itemData.product_id)}})
    const order = await prisma.order.findUnique({where: {order_id: parseInt(order_id)}})

    await prisma.order.update({where: 
        {order_id: parseInt(order_id)}, 
        data: {
            total_price: parseFloat(order.total_price) + parseFloat(product.price) * parseInt(itemData.quantity)
    }})

    return prisma.order_Item.create({
        data: {
            order_id: parseInt(order_id),
            product_id: parseInt(itemData.product_id),
            quantity: parseInt(itemData.quantity),
            price:  parseFloat(product.price) * parseInt(itemData.quantity)
        }
    });
};

// Function to calculate the total price of an order
const calculateOrderTotal = async (order_id) => {
    const order = await prisma.order.findUnique({
        where: { order_id: parseInt(order_id) },
        include: { Order_Items: true }
    });

    if (!order) {
        throw new Error("Order not found");
    }

    return parseFloat(order.total_price);
};

// Export all functions
module.exports = {
    getAllOrders,
    getOrderByID,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemToOrder,
    calculateOrderTotal
};
