import type { Request, Response, NextFunction } from "express";
import { ROLE } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { auth } from "../lib/auth.js";

export const requireRole =
  (roles: ROLE[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieToken =
        (req as any).cookies?.["better-auth.session_token"] ||
        (req.headers.cookie || "").replace("better-auth.session_token=", "");

      const sessionToken = await auth.api.getSession({
        headers: {
          cookie: `better-auth.session_token=${cookieToken}`,
        },
      });

      const session = await prisma.session.findUnique({
        where: { token: cookieToken },
      });

      if (!session) {
        return res
          .status(401)
          .json({ message: "Unauthorized because session not found" });
      }
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized because user not found" });
      }

      if (!roles.includes(user.role as ROLE)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
