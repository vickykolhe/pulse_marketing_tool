import express from "express";
import subscriberRoutes from "./subscriber.routes.js";
import campaignRoutes from "./campaign.routes.js";

const router = express.Router();

router.use("/subscribers", subscriberRoutes);
router.use("/campaigns", campaignRoutes);

export default router;
