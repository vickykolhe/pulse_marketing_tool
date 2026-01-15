import express from "express";
import {
  createSubscriber,
  getSubscribers,
} from "../controllers/subscriber.controller.js";
// import { validateRequest } from "../middlewares/validateRequest.js";
// import { createSubscriberSchema } from "../validators/subscriber.schema.js";

const router = express.Router();

// router.get("/", getSubscribers);
// router.post("/", validateRequest(createSubscriberSchema), getSubscribers);

router.post("/", createSubscriber);
router.get("/", getSubscribers);

export default router;
