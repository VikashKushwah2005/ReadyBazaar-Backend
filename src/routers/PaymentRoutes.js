
const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../middlewares/UserAuthMiddleware");
const paymentController = require("../controller/PaymentController");

router.get('/:paymentId',userAuthMiddleware, paymentController.paymentSuccessHandler);

module.exports = router;