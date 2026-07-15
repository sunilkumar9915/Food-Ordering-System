const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getUserOrders,
    getAllOrders,
    getAdminOrders,
    updateOrderStatus,
    cancelOrder
} = require("../controllers/orderController");

// ==========================
// USER ROUTES
// ==========================

// Place Order
router.post("/", placeOrder);

// Get My Orders
router.get("/", getUserOrders);

// Cancel Order
router.put("/cancel/:id", cancelOrder);

// ==========================
// ADMIN ROUTES
// ==========================

// Admin - All Orders
router.get("/all", getAdminOrders);

// Customer - My Orders
router.get("/:userId", getUserOrders);
// Update Order Status
router.put("/status/:id", updateOrderStatus);

module.exports = router;