import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../lib/utils";
import { FoodService } from "./food.service";

const CreateFoodCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.title) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Title is required",
    });
  }

  const result = await FoodService.createFoodCategory(data);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Food category created successfully",
    data: result,
  });
});

export const FoodController = {
  CreateFoodCategory,
};
