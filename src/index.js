require("dotenv").config();
const express = require('express');
const connectDB = require('./db/db.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({message: 'Welcome to Ready Bazaar Backend System!'});
})


const adminRoutes = require('./routers/AdminRoutes.js');
const sellerRoutes = require('./routers/SellerRouters.js');
const authRoutes = require('./routers/AuthRoutes.js');
const userRoutes = require('./routers/UserRoutes.js');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/sellers', sellerRoutes);
app.use('/admin', adminRoutes);

const productRoutes = require('./routers/ProductRoutes.js');
const sellerProductRoutes = require('./routers/SellerProductRoutes.js');

app.use('/products', productRoutes);
app.use('/api/sellers/products', sellerProductRoutes);

const cartRoutes = require('./routers/CartRoutes.js');
app.use('/api/cart', cartRoutes);

const userOrderRoutes = require('./routers/UserOrderRoutes.js');
const sellerOrderRoutes = require('./routers/SellerOrderRoutes.js');
app.use('/api/orders/user', userOrderRoutes);
app.use('/api/orders/seller', sellerOrderRoutes);


const port = process.env.PORT || 5000;
app.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
   await connectDB()
})