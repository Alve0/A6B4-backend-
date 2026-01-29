import { Prisma } from "../../generated/prisma/client";

export function errorHandler(err: any, _req: any, res: any, _next: any) {
  console.error("🔥 Error:", err);

  // Prisma known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      error: "Database error",
      code: err.code,
      message: err.message,
    });
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      message: err.message,
    });
  }

  // Custom app errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Default fallback
  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
}
