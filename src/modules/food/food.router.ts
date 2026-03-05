import { Router } from "express";
import { FoodController } from "./food.controller";
import { requireRole } from "../../middlewares/role";

const router = Router();

//category routes

router.post(
  "/categories",
  requireRole(["admin"]),
  FoodController.CreateFoodCategory,
);

router.get("/categories", FoodController.GetAllFoodCategories);

router.put(
  "/categories/:id",
  requireRole(["admin"]),
  FoodController.UpdateFoodCategory,
);

router.delete(
  "/categories/:id",
  requireRole(["admin"]),
  FoodController.DeleteFoodCategory,
);

export const FoodRouter = router;
