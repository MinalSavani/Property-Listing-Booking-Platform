import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { bookingValidation } from "../validators/bookingValidator.js"; // ✅

const router = express.Router();

// 🧾 Create new booking
router.post("/", protect, bookingValidation, createBooking); // ✅ Added

// 📋 Get all bookings for the logged-in user
router.get("/my-bookings", protect, getUserBookings);

// 🔹 Get a single booking by ID
router.get("/:id", protect, getBookingById);

export default router;
