import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* Middleware */
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pulse backend is running");
});

export default app;
