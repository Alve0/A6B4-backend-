import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import {
  ILoginData,
  IProvider,
  IRegisterData,
  ISessionWithUser,
} from "./interface";
import { ROLE } from "../../generated/prisma/enums";

const Register = async (data: IRegisterData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const { user: newUser, token } = await auth.api.signUpEmail({
      body: {
        ...data,
      },
    });

    const customer = await prisma.customer.create({
      data: {
        userId: newUser.id,
      },
    });
    const returnData = { newUser, customer, token };
    return returnData;
  } catch (error: any) {
    throw new Error(error.message || "Registration failed");
  }
};

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

const Login = async (paylord: ILoginData) => {
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: paylord.email,
      },
    });
    if (!userExist) {
      throw new Error("User not found");
    }
    const result = await auth.api.signInEmail({
      body: {
        ...paylord,
        callbackURL: `${process.env.ORIGIN}`,
      },
    });

    if (!result.token) {
      throw new Error("Invalid credentials");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

const providerRegister = async (data: IProvider) => {
  try {
    const createProveder = await prisma.provider.create({
      data: {
        title: data.title,
        discription: data.discription,
        logo_image: data.logo_image,
        banner_image: data.banner_image,
        address: data.address,
        phone: data.phone,
        userId: data.userId,
      },
    });

    const removeCustomer = await prisma.customer.delete({
      where: {
        userId: data.userId,
      },
    });

    const updateUserRole = await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        role: ROLE.provider,
      },
    });
    if (!removeCustomer) {
      throw new Error("Customer did not deleted successfully");
    }
    if (!updateUserRole) {
      throw new Error("Failed to update user role");
    }

    if (!createProveder.id) {
      throw new Error("Failed to create provider");
    }

    return createProveder;
  } catch (error: any) {
    throw new Error(error.message || "Provider registration failed");
  }
};

export const authService = {
  GoogleLogin,
  Register,
  Login,
  providerRegister,
};
