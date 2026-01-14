const express = require("express");
const sellerController = require("../controller/SellerController");
const selllerauthMiddleware = require("../middlewares/SellerAuthMiddleware.js");

const router = express.Router();

router.get("/profile",selllerauthMiddleware, sellerController.getSellerProfile);
router.post("/",sellerController.createSeller);
router.get("/",sellerController.getAllSellers);
router.patch("/",selllerauthMiddleware,sellerController.updateSeller);

router.post("/verify/login-otp" ,sellerController.verifyLoginOtp);

module.exports = router;