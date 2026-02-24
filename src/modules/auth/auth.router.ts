import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

//register
router.post("/register", authController.Register);

//login
router.post("/sign-in", authController.Login);

router.use("/google/login", authController.googleLogin);
router.use("/google/success", authController.googleLoginSuccess);

export const authRouter = router;
