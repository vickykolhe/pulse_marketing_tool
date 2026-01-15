// import express from "express";
// import { getCampaigns } from "../controllers/campaign.controller.js";

// const router = express.Router();

// router.get("/", getCampaigns);

// export default router;

import express from "express";
import {
  createCampaign,
  getCampaigns,
  sendCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.post("/", createCampaign);
router.post("/:id/send", sendCampaign);
router.get("/", getCampaigns);

export default router;
