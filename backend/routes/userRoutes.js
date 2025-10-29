import express from "express";
import { getProfile } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route
router.get("/profile", protect, getProfile);

// Example of role-based route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
