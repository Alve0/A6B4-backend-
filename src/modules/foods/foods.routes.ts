import { Router } from "express";
import { foodsController } from "./foods.controller";

const router = Router();

router.post("/",  foodsController.postFood); 

export const foodsRoutes =  router;
