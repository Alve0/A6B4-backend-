import { Request, Response } from "express";
import {
  catchAsync,
  sendResponse,
  setBetterAuthSessionCookie,
} from "../../lib/utils";
import { authService } from "./auth.service";

import { auth } from "../../lib/auth";

import { ILoginData, IRegisterData } from "./interface";
import { prisma } from "../../lib/prisma";

const Register = catchAsync(async (req: Request, res: Response) => {
  const data: IRegisterData = req.body;

  const result = await authService.Register(data);
  if (!result.customer.userId) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Failed to register user",
    });
  }
  const cookieUpdate = await setBetterAuthSessionCookie(
    res,
    result.token as string,
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User registered successfully",
    data: { ...result, cookieUpdate },
  });
});

const Login = catchAsync(async (req: Request, res: Response) => {
  const data: ILoginData = req.body;
  const result = await authService.Login(data);

  const cookieUpdate = await setBetterAuthSessionCookie(res, result.token);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: { ...result, cookieUpdate },
  });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const redirectURl = req.query.redirect || "/";
  const encodedRedirectURL = encodeURIComponent(redirectURl as string);
  const CALLBACK_URL = `${process.env.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectURL}`;

  const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
  res.render("google_login", {
    CALLBACK_URL,
    BETTER_AUTH_URL,
  });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const redirectUrl = (req.query.redirect as string) || "/dashboard";

  const sessonToken = req.cookies["better-auth.session_token"];

  if (!sessonToken) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "No session token found",
    });
  }

  const sesson = await auth.api.getSession({
    headers: {
      cookie: `better-auth.session_token=${sessonToken}`,
    },
  });

  if (!sesson || !sesson.user) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Invalid session token",
    });
  }

  const result = await authService.GoogleLogin(sesson as any);

  const isValidRedirectPath =
    redirectUrl.startsWith("/") && !redirectUrl.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectUrl : "/dashboard";

  res.redirect(`${process.env.ORIGIN}${finalRedirectPath}`);
});

const providerRegister = catchAsync(async (req: Request, res: Response) => {
  let data = req.body;

  const sesson = await prisma.session.findUnique({
    where: {
      token: (req as any).cookies?.["better-auth.session_token"],
    },
    include: {
      user: true,
    },
  });

  console.log("Session found:", sesson);

  const existingUser = await prisma.user.findUnique({
    where: { id: sesson?.user?.id },
  });

  if (!existingUser) {
    sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "User not found",
    });
    return;
  }
  data = { ...data, userId: existingUser.id };
  const result = await authService.providerRegister(data);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Provider registered successfully",
    data: result,
  });
});

export const authController = {
  googleLogin,
  googleLoginSuccess,
  Register,
  Login,
  providerRegister,
};
