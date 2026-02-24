import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ILoginData, IRegisterData, ISessionWithUser } from "./interface";

const Register = async (data: IRegisterData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const result = await auth.api.signUpEmail({
      body: {
        ...data,
      },
    });

    const customer = await prisma.customer.create({
      data: {
        userId: result.user.id,
      },
    });

    return { result, customer };
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
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const authService = {
  GoogleLogin,
  Register,
  Login,
};
