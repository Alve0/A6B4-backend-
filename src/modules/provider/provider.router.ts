import { Router } from "express";
import { providerController } from "./provider.controller";
import { requireRole } from "../../middlewares/role";

const router = Router();

router.post(
  "/create-food",
  requireRole(["provider"]),
  providerController.CreateFood,
);

router.get("/get-foods/:providerId", providerController.getFoodByProvider);

router.get("/get-foods", providerController.getAllFood);

export const providerRouter = router;
