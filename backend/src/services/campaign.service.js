import { Campaign } from "../models/index.js";

/* Create Campaign */
export const createCampaignService = async (data) => {
  return await Campaign.create(data);
};

/* Get All Campaigns */
export const getCampaignsService = async () => {
  return await Campaign.findAll({
    order: [["createdAt", "DESC"]],
  });
};
