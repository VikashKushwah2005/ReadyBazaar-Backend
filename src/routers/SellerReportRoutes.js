const express = require("express");
const router = express.Router();
const sellerAuthMiddleware = require("../middlewares/SellerAuthMiddleware");
const sellerReportController = require("../controller/SellerReportController"); 


router.get("/", sellerAuthMiddleware, sellerReportController.getSellerReports);

module.exports = router;