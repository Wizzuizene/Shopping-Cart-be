const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register-user", authController.register);
router.post("/login-user", authController.login);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;

