import { Food } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

async function postFood(data: Food) {
  const result = await prisma.food.create({ data });
  return result;
}

export const foodsService = { postFood };
