import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

app.use(express.json()); //middleware to parse JSON bodies

app.use("/api", routes); // Mounting the main router

app.use(errorHandler); // Error handling middleware

export default app;
