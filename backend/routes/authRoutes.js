import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { signupValidation, loginValidation } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;
