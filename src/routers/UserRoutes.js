const express = require("express");
const userController = require("../controller/UserController");
const router = express.Router();
const userAuthMiddleware = require("../middlewares/UserAuthMiddleware.js");
router.get("/profile",userAuthMiddleware, userController.getUserProfileByjwt);

module.exports = router;