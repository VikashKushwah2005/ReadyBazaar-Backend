const express = require("express");
const router = express.Router();

const sellerAuthMiddleware = require("../middlewares/SellerAuthMiddleware");
const transactionController = require("../controller/TransactionController");

router.get("/seller", sellerAuthMiddleware, transactionController.getTransactionByseller);

module.exports = router;