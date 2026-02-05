import { NextFunction, Request, Response } from "express";
import { foodsService } from "./foods.service";
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";

async function postFood(req: Request, res: Response, next: NextFunction) {
  try {
    let data = req.body;
    const categoryId = await prisma.category
      .findFirst({ where: { name: data.categoryName } })
      .then((cat) => cat?.id);

    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    const providerId = await prisma.provider
      .findFirst({ where: { userId: session?.user.id } })
      .then((prov) => prov?.id);

    data = {
      ...data,
      categoryId: categoryId || null,
      providerId: providerId || null,
    };
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

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const result = await foodsService.createCategory(data);
    res.status(201).json({
      success: true,
      added_id: result.id,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function getFood(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const result = await foodsService.getFood(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export const foodsController = {
  postFood,
  createCategory,
  getFood,
};
