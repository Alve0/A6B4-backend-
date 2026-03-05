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

const GetAllFoodCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodService.getAllFoodCategories();
  if (!result || result.length === 0) {
    sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "No food categories found",
    });
  }
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food categories retrieved successfully",
    data: result,
  });
});

const UpdateFoodCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body;
  if (!data.title) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Title is required",
    });
  }

  const result = await FoodService.updateFoodCategory(id, data);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food category updated successfully",
    data: result,
  });
});

const DeleteFoodCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await FoodService.deleteFoodCategory(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food category deleted successfully",
    data: result,
  });
});

export const FoodController = {
  CreateFoodCategory,
  GetAllFoodCategories,
  UpdateFoodCategory,
  DeleteFoodCategory,
};
