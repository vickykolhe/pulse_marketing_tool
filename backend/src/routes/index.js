import express from "express";
import subscriberRoutes from "./subscriber.routes.js";
import campaignRoutes from "./campaign.routes.js";
import analyticsRoutes from "./analytics.routes.js";

const router = express.Router();

router.use("/subscribers", subscriberRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
