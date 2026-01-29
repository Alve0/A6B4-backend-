import { Router } from "express";
import { foodsController } from "./foods.controller";
import { requireRole } from "../../middlewares/role";

const router = Router();

router.post(
  "/category",
  requireRole(["admin"]),
  foodsController.createCategory,
);

router.post("/", requireRole(["admin", "provider"]), foodsController.postFood);

export const foodsRoutes = router;
