import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

// User routes
router.get("/my-orders", authMiddleware, orderController.getMyOrders);
router.post("/", authMiddleware, orderController.createOrder);
router.get("/:orderId", authMiddleware, orderController.getOrderDetails);
router.put("/my-orders/:orderId/cancel", authMiddleware, orderController.cancelMyOrder);

// Admin routes (sau này thêm adminMiddleware)
router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put("/:orderId", authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.delete("/:orderId", authMiddleware, adminMiddleware, orderController.deleteOrder);

export default router;
