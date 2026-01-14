import express from "express";
import { getSubscribers } from "../controllers/subscriber.controller.js";

const router = express.Router();

router.get("/", getSubscribers);

export default router;
