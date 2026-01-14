const express = require('express');
const router = express.Router();
const OrderController =  require('../controller/OrderController');
const SellerAuthMiddleware = require('../middlewares/SellerAuthMiddleware');

router.post('/',SellerAuthMiddleware,OrderController.getSellerOrderHistory);

router.patch(
    '/orderId/status/:orderStatus',
    SellerAuthMiddleware,
    OrderController.updateOrderStatus
);



module.exports = router;