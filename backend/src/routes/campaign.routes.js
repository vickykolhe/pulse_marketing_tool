import express from "express";
import { getCampaigns } from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", getCampaigns);

export default router;
