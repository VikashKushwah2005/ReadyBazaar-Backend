const express = require("express");
const adminController = require("../controller/SellerController");
const router = express.Router();

router.patch("/seller/:id/status/:status",adminController.updateSellerAccountStatus);

module.exports = router;