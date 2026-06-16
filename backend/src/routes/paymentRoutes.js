import express from "express";
import authMiddleware from "../middleware/auth.js";
import * as paymentController from "../controllers/paymentController.js";

const router = express.Router();

// User routes
router.post("/", authMiddleware, paymentController.createPayment);
router.get(
  "/order/:orderId",
  authMiddleware,
  paymentController.getPaymentByOrderId,
);

// Webhook từ payment gateway (không cần auth)
router.post("/confirm", paymentController.confirmPayment);

// Admin routes
router.get("/", paymentController.getAllPayments);

export default router;
