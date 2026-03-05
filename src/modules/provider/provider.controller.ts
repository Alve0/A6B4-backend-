import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../lib/utils";
import { providerService } from "./provider.service";
import { prisma } from "../../lib/prisma";

const CreateFood = catchAsync(async (req: Request, res: Response) => {
  let data = req.body;

  const sesson = await prisma.session.findUnique({
    where: {
      token: (req as any).cookies?.["better-auth.session_token"],
    },
    include: {
      user: true,
    },
  });
  const provider = await prisma.provider.findUnique({
    where: {
      userId: sesson?.userId,
    },
  });

  data = {
    ...data,
    providerId: provider?.id,
  };

  const result = await providerService.createFood(data);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food item created successfully",
    data: result,
  });
});

const getFoodByProvider = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.params.providerId as string;
  const result = await providerService.getFoodByProvider(providerId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food items fetched successfully",
    data: result,
  });
});

const getAllFood = catchAsync(async (req: Request, res: Response) => {
  const result = await providerService.getAllFood();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Food items fetched successfully",
    data: result,
  });
});

export const providerController = {
  CreateFood,
  getFoodByProvider,
  getAllFood,
};
