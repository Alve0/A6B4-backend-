import { Router } from "express";
import { authRouter } from "../modules/auth/auth.router";
import { FoodRouter } from "../modules/food/food.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/food", FoodRouter);

export const AppRouter = router;
