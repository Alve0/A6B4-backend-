import { prisma } from "../../lib/prisma";
import { FoodCategoryType } from "./food.interface";

//create food
//get all food
//get food by id
//update food by id
//delete food by id
//get food by category id
//get food by provider id
//get food by name
//get food by price range
//get food by rating
//get food by popularity
//create food category
//get all food categories

//create categoty

const createFoodCategory = async (categoryData: FoodCategoryType) => {
  try {
    const title = categoryData.title.toLowerCase();

    const existingCategory = await prisma.category.findUnique({
      where: {
        title: title,
      },
    });

    if (existingCategory) {
      throw new Error("Food category already exists");
    }

    const result = await prisma.category.create({
      data: {
        title: title,
      },
    });
    if (!result) {
      throw new Error("Failed to create food category");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create food category");
  }
};

export const FoodService = {
  createFoodCategory,
};
