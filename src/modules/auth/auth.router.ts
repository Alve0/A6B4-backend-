import { Router } from "express";
import { authController } from "./auth.controller";
import { requireRole } from "../../middlewares/role";

const router = Router();

//register
router.post("/register", authController.Register);

//login
router.post("/sign-in", authController.Login);

router.use("/google/login", authController.googleLogin);
router.use("/google/success", authController.googleLoginSuccess);

//create provider
router.post(
  "/provider/register",
  requireRole(["customer"]),
  authController.providerRegister,
);

export const authRouter = router;
