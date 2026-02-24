import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
router.use("/login", authController.googleLogin);
router.use("/google/success", authController.googleLoginSuccess);

export const authRouter = router;
