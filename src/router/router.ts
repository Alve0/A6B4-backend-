import { Router } from "express";
import { authRouter } from "../modules/auth/auth.router";
import { FoodRouter } from "../modules/food/food.router";
import { providerRouter } from "../modules/provider/provider.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/food", FoodRouter);
router.use("/provider", providerRouter);

export const AppRouter = router;
