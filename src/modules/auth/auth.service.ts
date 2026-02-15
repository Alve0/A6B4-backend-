import { error } from "node:console";
import { auth } from "../../lib/auth";
import { ILogin, IRegister } from "../../lib/type";
import { prisma } from "../../lib/prisma";

async function register(params: IRegister) {
  const data = await auth.api.signUpEmail({
    body: {
      name: params.name,
      email: params.email,
      password: params.password,
      role: params.role || "customer",
    },
  });

  if (!data.user) {
    throw error("user not created");
  }

  return data;
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
