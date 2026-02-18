import { error } from "node:console";
import { auth } from "../../lib/auth";
import { ILogin, IRegister } from "../../lib/type";
import { prisma } from "../../lib/prisma";

async function register(params: IRegister) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: params.name,
        email: params.email,
        password: params.password,
        role: "customer",
      },
    });
    if (!data.user) {
      throw new Error("user not created");
    }

    try {
      const customer = await prisma.customer.create({
        data: {
          userId: data.user.id as string,
        },
      });
      return { data, customer };
    } catch (err) {
      throw new Error("Failed to create customer in database");
    }
  } catch (err) {
    throw new Error("Failed to create user");
  }
}

async function login(params: ILogin) {
  const data = await auth.api.signInEmail({
    body: params,
  });

  return data;
}

async function getAllUser() {
  const result = await prisma.user.findMany();
  return result;
}

export const authService = { register, getAllUser, login };
