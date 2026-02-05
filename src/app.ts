import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./lib/errorHendeller";
import { notFound } from "./lib/notFound";
import { AppRouter } from "./router/router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", AppRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);
app.use(notFound);

export { app };
