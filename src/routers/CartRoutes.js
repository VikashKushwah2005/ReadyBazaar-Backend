const express = require('express');
const router = express.Router();
const cartController = require('../controller/CartController');    
const userauthMiddleware = require('../middlewares/UserAuthMiddleware');


router.get('/', userauthMiddleware, cartController.findUserCartHandler);

router.put('/add', userauthMiddleware, cartController.addItemsToCartHandler);

router.delete('/item/:cartItemId', userauthMiddleware, cartController.deleteCartItemHandler);

router.put('/item/:cartItemId', userauthMiddleware, cartController.updateCartItemHandler);

module.exports = router;