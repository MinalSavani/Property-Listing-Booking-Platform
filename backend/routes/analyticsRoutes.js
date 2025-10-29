import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAdminAnalytics, getHostAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// Admin Analytics (protected, admin only)
router.get("/admin", protect, authorizeRoles("admin"), getAdminAnalytics);

// Host Analytics (protected, host only)
router.get("/host", protect, authorizeRoles("host"), getHostAnalytics);

export default router;
