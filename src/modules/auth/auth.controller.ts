import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../lib/utils";
import { authService } from "./auth.service";
import { success } from "better-auth";
import { auth } from "../../lib/auth";

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const redirectURl = req.query.redirect || "/";
  const encodedRedirectURL = encodeURIComponent(redirectURl as string);
  const CALLBACK_URL = `${process.env.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectURL}`;
  console.log("CALLBACK_URL:", CALLBACK_URL);
  const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
  res.render("google_login", {
    CALLBACK_URL,
    BETTER_AUTH_URL,
  });
});

const googleLoginSuccess = catchAsync(async (req: Request, res: Response) => {
  const redirectUrl = (req.query.redirect as string) || "/dashboard";

  const sessonToken = req.cookies["better-auth.session_token"];

  console.log("Session Token:", sessonToken);

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

  const result = await authService.GoogleLogin(sesson);

  const isValidRedirectPath =
    redirectUrl.startsWith("/") && !redirectUrl.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectUrl : "/dashboard";

  res.redirect(`${process.env.ORIGIN}${finalRedirectPath}`);
});

export const authController = {
  googleLogin,
  googleLoginSuccess,
};
