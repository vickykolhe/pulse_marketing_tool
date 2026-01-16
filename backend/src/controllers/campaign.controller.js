// export const getCampaigns = (req, res) => {
//   res.json({
//     message: "Campaigns endpoint working",
//   });
// };

import {
  createCampaignService,
  getCampaignsService,
  sendCampaignService,
  updateDraftCampaignService,
  getCampaignByIdService,
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

/* Send Campaign */
export const sendCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await sendCampaignService(id);

    res.json({
      message: "Campaign sent successfully",
      analyticsGenerated: result.analyticsCount,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const updatedCampaign = await updateDraftCampaignService(
      req.params.id,
      req.body
    );

    res.json(updatedCampaign);
  } catch (error) {
    next(error);
  }
};

/* Get Campaign by ID */
export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await getCampaignByIdService(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status = "" } = req.query;

    const result = await getCampaignsService({
      page: Number(page),
      limit: Number(limit),
      status: status || null,
    });

    res.json({
      total: result.count,
      page: Number(page),
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
