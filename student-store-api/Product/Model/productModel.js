const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function that returns all the products
const getAllProducts = async (category, sort) => {
    let products = await prisma.product.findMany();

    if (category) {
        products = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    if (sort === 'price') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
};

// Function that returns product by ID
const getProductByID = async (id) => {
    return prisma.product.findUnique({ where: { id: parseInt(id) }});
};

// Function to create new product
const createProduct = async (productData) => {
    return prisma.product.create({ data: productData });
};

// Function to update existing product
const updateProduct = async (id, productData) => {
    return prisma.product.update({
        where: { id: parseInt(id) },
        data: productData
    });
};

// Function to delete existing product
const deleteProduct = async (id) => {
    return prisma.product.delete({ where: { id: parseInt(id) } });
};

//export all functions
module.exports = {
    getAllProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
};