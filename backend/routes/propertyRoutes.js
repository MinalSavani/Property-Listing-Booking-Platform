// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   createProperty,
//   getProperties,
//   getPropertyById,
//   updateProperty,
//   deleteProperty,
// } from "../controllers/propertyController.js";
// import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
// import { propertyValidation } from "../validators/propertyValidator.js"; // ✅

// const router = express.Router();

// // 🏠 Public routes
// router.get("/", getProperties);
// router.get("/:id", getPropertyById);

// // 👤 Host-only routes
// router.post(
//   "/",
//   protect,
//   authorizeRoles("host"),
//   upload.array("images", 5),
//   propertyValidation, // ✅ Added
//   createProperty
// );

// router.patch(
//   "/:id",
//   protect,
//   authorizeRoles("host"),
//   upload.array("images", 5),
//   propertyValidation, // ✅ Added
//   updateProperty
// );

// router.delete("/:id", protect, authorizeRoles("host"), deleteProperty);

// export default router;
import express from "express";
import multer from "multer";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties, // <-- Import the new controller function
} from "../controllers/propertyController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
// import { propertyValidation } from "../validators/propertyValidator.js"; // <-- You should re-enable this for security!

const router = express.Router();

// Configure file uploads with multer
const upload = multer({ dest: "uploads/" });

/*
 * --- ROUTE ORDERING ---
 * More specific routes (like '/my-properties') MUST be defined
 * BEFORE more general, parameterized routes (like '/:id').
 */

// 🌍 Public Routes
router.get("/", getProperties); // Get all properties (with optional filters)

// 🏠 Host-Specific Routes (Protected)
// This specific route now comes before the general '/:id' route to avoid conflicts.
router.get("/my-properties", protect, authorizeRoles("host"), getMyProperties);

// 👤 Host-Only Management Routes (Protected)
router.post(
  "/",
  protect,
  authorizeRoles("host"),
  upload.array("images", 5),
  // propertyValidation, // <-- Good idea to add validation back
  createProperty
);

// This general route comes last.
router.get("/:id", getPropertyById); // Get single property by ID

// Using PATCH is better for updates as it implies a partial update, not a full replacement.
router.patch(
  "/:id",
  protect,
  authorizeRoles("host"),
  upload.array("images", 5),
  // propertyValidation, // <-- Good idea to add validation back
  updateProperty
);

router.delete("/:id", protect, authorizeRoles("host"), deleteProperty);

export default router;
