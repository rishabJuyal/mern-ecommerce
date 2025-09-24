const express = require("express");
const router = express.Router();
const cartController = require("./cart.controller");
const {authMiddleware} = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, cartController.addToCart);
router.put("/", authMiddleware, cartController.updateCartItem);
router.delete("/:productId", authMiddleware, cartController.removeCartItem);

module.exports = router;
