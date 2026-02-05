import { Category, Food } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

async function postFood(data: Food) {
  const result = await prisma.food.create({ data });
  return result;
}

async function createCategory(data: Category) {
  const result = await prisma.category.create({ data });
  return result;
}

async function getFood(id: any) {
  const result = await prisma.food.findUnique({
    where: { id },
  });

  if (!result) {
    throw new Error("Food not found");
  }
  return result;
}

export const foodsService = { postFood, createCategory, getFood };
