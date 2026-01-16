import sequelize from "../config/database.js";
import { Campaign, Subscriber, Analytics } from "../models/index.js";

/* Create Campaign */
export const createCampaignService = async (data) => {
  return await Campaign.create(data);
};

/* Send Campaign */
export const sendCampaignService = async (campaignId) => {
  return await sequelize.transaction(async (t) => {
    /* 1️⃣ Verify Campaign */
    const campaign = await Campaign.findByPk(campaignId, { transaction: t });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    if (campaign.status !== "draft") {
      throw new Error("Campaign already sent");
    }

    /* 2️⃣ Fetch Subscribers */
    const subscribers = await Subscriber.findAll({ transaction: t });

    if (subscribers.length === 0) {
      throw new Error("No subscribers available");
    }

    /* 3️⃣ Update Campaign Status */
    campaign.status = "sent";
    campaign.sentAt = new Date();
    await campaign.save({ transaction: t });

    /* 4️⃣ Generate Analytics (≥30%) */
    const minOpens = Math.ceil(subscribers.length * 0.3);

    const shuffled = subscribers.sort(() => 0.5 - Math.random());
    const openedSubscribers = shuffled.slice(0, minOpens);

    const analyticsData = openedSubscribers.map((subscriber) => ({
      campaign_id: campaign.id,
      subscriber_id: subscriber.id,
      openedAt: true,
    }));

    await Analytics.bulkCreate(analyticsData, { transaction: t });

    return {
      analyticsCount: analyticsData.length,
    };
  });
};

export const updateDraftCampaignService = async (id, data) => {
  const campaign = await Campaign.findByPk(id);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  if (campaign.status === "sent") {
    throw new Error("Sent campaigns cannot be edited");
  }

  await campaign.update({
    title: data.title,
    emailSubject: data.emailSubject,
    content: data.content,
  });

  return campaign;
};

/* Get campaign by ID */
export const getCampaignByIdService = async (id) => {
  return await Campaign.findByPk(id);
};

/* Get campaigns with pagination & filter */
export const getCampaignsService = async ({ page, limit, status }) => {
  const offset = (page - 1) * limit;

  const whereClause = status ? { status } : {};

  return await Campaign.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
};

// /* Get All Campaigns */
// export const getCampaignsService = async () => {
//   return await Campaign.findAll({
//     order: [["createdAt", "DESC"]],
//   });
// };
