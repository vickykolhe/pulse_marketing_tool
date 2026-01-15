// export const getCampaigns = (req, res) => {
//   res.json({
//     message: "Campaigns endpoint working",
//   });
// };

import {
  createCampaignService,
  getCampaignsService,
} from "../services/campaign.service.js";

/* Create Campaign */
export const createCampaign = async (req, res, next) => {
  try {
    const campaign = await createCampaignService(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    next(error);
  }
};

/* Get Campaigns */
export const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await getCampaignsService();
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};
