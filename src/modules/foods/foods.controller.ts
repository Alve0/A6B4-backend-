import { NextFunction, Request, Response } from "express";
import { foodsService } from "./foods.service";

async function postFood(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const result = await foodsService.postFood(data);
    res.status(201).json({
      success: true,
      added_id: result.id,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export const foodsController = {
  postFood,
};
