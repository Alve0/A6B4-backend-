import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.service";
import { auth } from "../../lib/auth";

async function createProvider(req: Request, res: Response, next: NextFunction) {
  try {
    let data = req.body;

    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    data = {
      ...data,
      userId: session!.user.id,
      email: session!.user.email!,
      name: session!.user.name!,
    };

    const result = await providerService.createProvider(data);
    res.status(201).json({
      provider_id: result.id,
      message: "Provider created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export const providerController = { createProvider };
