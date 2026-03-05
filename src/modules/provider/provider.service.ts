import { prisma } from "../../lib/prisma";

const createFood = async (data: IFoodData) => {
  try {
    const result = prisma.food.create({
      data: {
        ...data,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to create food item");
  }
};

const getFoodByProvider = async (providerId: string) => {
  try {
    const result = prisma.food.findMany({
      where: {
        providerId,
      },
    });
    if (!result) {
      throw new Error("No food items found for this provider");
    }
    return result;
  } catch (error) {
    throw new Error("Failed to fetch food items");
  }
};

const getAllFood = async () => {
  try {
    const result = prisma.food.findMany();
    if (!result) {
      throw new Error("No food items found");
    }
    return result;
  } catch (error) {
    throw new Error("Failed to fetch food items");
  }
};
export const providerService = {
  createFood,
  getFoodByProvider,
  getAllFood,
};
