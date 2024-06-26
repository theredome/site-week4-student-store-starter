require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const productRoute = require("./Product/Route/productRoute");
const orderRoute = require("./Order/Route/orderRoute")
const orderItemRoute = require("./Order_Item/Route/orderItemRoute")


app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev"));
app.use(express.json())

app.get('/', (req, res) => 
    res.send("If you're reading this you way too deep in the backend homie >.<")
)

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use("/order-items", orderItemRoute);

app.listen(3000, () => console.log('Server is running on port http://localhost:3000/'))