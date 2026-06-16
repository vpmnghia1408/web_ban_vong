import express from "express";
import * as authController from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/users", authMiddleware, adminMiddleware, authController.getAllUsers);
router.post("/users", authMiddleware, adminMiddleware, authController.createUser);
router.put("/users/:id", authMiddleware, adminMiddleware, authController.updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, authController.deleteUser);
router.get("/profile", authMiddleware, authController.getProfile);
router.put("/profile", authMiddleware, authController.updateProfile);
router.put("/change-password", authMiddleware, authController.changePassword);

export default router;
