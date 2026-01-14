const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const sellerAuthMiddleware = require('../middlewares/SellerAuthMiddleware');

router.get("/", sellerAuthMiddleware, productController.getProductsBySellerId);

router.get("/:productId", productController.getProductById);

router.post("/",sellerAuthMiddleware, productController.createProduct);

router.delete("/:productId",sellerAuthMiddleware, productController.deleteProduct);

router.patch("/:productId",sellerAuthMiddleware, productController.updateProduct);


module.exports = router; 
