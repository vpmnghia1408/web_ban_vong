import express from "express";
import authMiddleware from "../middleware/auth.js";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

// Protected routes
router.get("/", authMiddleware, cartController.getByUserId);
router.post("/", authMiddleware, cartController.addToCart);
router.put("/:productId", authMiddleware, cartController.updateQuantity);
router.delete("/:productId", authMiddleware, cartController.removeFromCart);
router.delete("/", authMiddleware, cartController.clearCart);
router.get("/total", authMiddleware, cartController.getCartTotal);

export default router;
