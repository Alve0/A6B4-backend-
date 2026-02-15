import { ROLE } from "../generated/prisma/enums";

export interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  role?: ROLE;
}

export interface ILogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}
