import { Router } from "express";
import { FoodController } from "./food.controller";
import { requireRole } from "../../middlewares/role";

const router = Router();

router.post(
  "/category",
  requireRole(["admin"]),
  FoodController.CreateFoodCategory,
);

export const FoodRouter = router;
