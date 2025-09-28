import express from "express"
import { loginHandle, logoutHandle, registerHandle, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../db/controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/check-auth", verifyToken, checkAuth)

router.post("/register", registerHandle);
router.post("/login", loginHandle);
router.post("/logout", logoutHandle);

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword);

export default router;