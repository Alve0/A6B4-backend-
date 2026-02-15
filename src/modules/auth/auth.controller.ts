import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../lib/utils";
import { authService } from "./auth.service";

const Register = catchAsync(async (req: Request, res: Response) => {
  const params = req.body;
  const result = await authService.register(params);
  sendResponse(res, {
    success: true,
    httpStatusCode: 201,
    message: "Created the account successfully",
    data: result,
  });
});

const GetAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.getAllUser();
  sendResponse(res, {
    success: true,
    httpStatusCode: 201,
    message: "Got all the user successfully",
    data: result,
  });
});

const Login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Login Successfull",
    data: result,
  });
});

export const authController = { Register, GetAllUser, Login };
