const express = require("express");
const router= express.Router();

const authController = require("./auth.controller")

router.post('/register',authController.signup)
router.post('/login',authController.login)
router.post("/refresh",authController.refresh);
router.post("/logout",authController.logout);
router.post("/logoutAll",authController.logoutAll);

module.exports = router;