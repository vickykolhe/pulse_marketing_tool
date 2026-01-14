import express from "express";
import { getSubscribers } from "../controllers/subscriber.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createSubscriberSchema } from "../validators/subscriber.schema.js";

const router = express.Router();

// router.get("/", getSubscribers);
router.post("/", validateRequest(createSubscriberSchema), getSubscribers);

export default router;
