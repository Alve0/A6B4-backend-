import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

//create user
router.post("/register", authController.Register);
//get all user
router.get("/users", authController.GetAllUser);
//login user
router.post("/login", authController.Login);

export const authRouter = router;
