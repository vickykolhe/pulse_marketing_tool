import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Pulse backend is running");
});

export default app;
