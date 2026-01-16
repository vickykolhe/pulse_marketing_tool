import express from "express";
import {
  createCampaign,
  getCampaigns,
  sendCampaign,
  updateCampaign,
  getCampaignById,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", getCampaigns);
router.post("/", createCampaign);
router.get("/:id", getCampaignById);
router.put("/:id", updateCampaign);
router.post("/:id/send", sendCampaign);
export default router;
