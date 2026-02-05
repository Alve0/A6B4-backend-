import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { foodsRoutes } from "./modules/foods/foods.routes.js";
import { errorHandler } from "./middlewares/globalError.js";
import { notFound } from "./middlewares/notFound.js";
import { providerRouter } from "./modules/provider/provider.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/foods", foodsRoutes);

app.use("/api/providers", providerRouter);

app.use(notFound);

app.use(errorHandler);
export { app };
