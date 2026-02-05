import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { Role } from "../generated/prisma/enums.js";
export const requireRole =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(session.user.role as Role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
