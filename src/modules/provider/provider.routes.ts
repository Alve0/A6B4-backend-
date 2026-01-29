import { Router } from "express";
import { providerService } from "./provider.service";
import { providerController } from "./provider.contoller";
import { requireRole } from "../../middlewares/role";

const router = Router();

router.post(
  "/",
  requireRole(["provider", "admin"]),
  providerController.createProvider,
);

export const providerRouter = router;
