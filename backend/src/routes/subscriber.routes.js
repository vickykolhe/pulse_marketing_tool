import express from "express";
import {
  createSubscriber,
  getSubscribers,
  bulkCreateSubscribers,
} from "../controllers/subscriber.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createSubscriberSchema,
  bulkSubscriberSchema,
} from "../validators/subscriber.schema.js";

const router = express.Router();

// router.post("/", validateRequest(createSubscriberSchema), getSubscribers);

router.post("/", validateRequest(createSubscriberSchema), createSubscriber);
router.post(
  "/bulk",
  validateRequest(bulkSubscriberSchema),
  bulkCreateSubscribers
);
router.get("/", getSubscribers);

export default router;
