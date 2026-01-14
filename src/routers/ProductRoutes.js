const express = require('express');
const ProductController = require('../controller/ProductController');
const router = express.Router();

router.get("/search",ProductController.searchProducts);

router.get("/",ProductController.getAllProducts);

router.get("/:productId",ProductController.getProductById);

module.exports = router;