import { prisma } from "../../lib/prisma";
import { ISessionWithUser } from "./interface";

const GoogleLogin = async (sessonToken: ISessionWithUser) => {
  const customer = await prisma.customer.findUnique({
    where: {
      userId: sessonToken.session.userId,
    },
  });
  if (!customer) {
    const newCustomer = await prisma.customer.create({
      data: {
        userId: sessonToken.session.userId,
      },
    });
    return newCustomer;
  }
  return customer;
};

export const authService = {
  GoogleLogin,
};
