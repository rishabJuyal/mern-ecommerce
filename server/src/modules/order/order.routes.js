const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const {authMiddleware ,authorizeRoles} = require("../../middlewares/auth.middleware");

// Create order
router.post("/", authMiddleware, orderController.createOrder);

// Get orders for the logged-in user
router.get("/", authMiddleware, orderController.getOrders);
router.post("/:id/pay",authMiddleware,orderController.payOrder)
router.post("/create-payment-intent", authMiddleware, orderController.createPaymentIntent);// to pay in our frontend
router.post("/create-checkout-session", authMiddleware, orderController.createCheckoutSession);//to open stripe ui
router.get('/payment-success', authMiddleware, orderController.paymentSuccess);

// Admin routes (optional: protect with admin check)
router.get("/all", authMiddleware,authorizeRoles('admin'), orderController.getAllOrders);
router.put("/:id", authMiddleware,authorizeRoles('admin'), orderController.updateOrderStatus);
router.post('/mark-paid', authMiddleware, authorizeRoles('admin'), orderController.markOrderPaidManually);

module.exports = router;
