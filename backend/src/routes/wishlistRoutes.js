import express from "express";
import authMiddleware from "../middleware/auth.js";
import * as wishlistController from "../controllers/wishlistController.js";

const router = express.Router();

// Tất cả các tuyến đường liên quan đến yêu thích đều cần đăng nhập
router.get("/", authMiddleware, wishlistController.getWishlist);
router.post("/", authMiddleware, wishlistController.addToWishlist);
router.delete("/:productId", authMiddleware, wishlistController.removeFromWishlist);

export default router;
