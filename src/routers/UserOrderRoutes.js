const express = require('express');
const router = express.Router();
const OrderController =  require('../controller/OrderController');
const UserAuthMiddleware = require('../middlewares/UserAuthMiddleware');

router.post('/',UserAuthMiddleware,OrderController.createOrder);

router.get('/',UserAuthMiddleware,OrderController.getUserOrderHistory);

router.put('/:orderId/cancel',UserAuthMiddleware,OrderController.cancelOrder);

router.get('/:orderId',UserAuthMiddleware,OrderController.getOrderById);

router.get('/item/:orderItemId',UserAuthMiddleware,OrderController.getOrderItemById);

module.exports = router;