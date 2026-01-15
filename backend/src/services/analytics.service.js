import { Campaign, Subscriber, Analytics } from "../models/index.js";
import { Sequelize } from "sequelize";

export const getDashboardAnalyticsService = async () => {
  /* 1️⃣ Total Subscribers */
  const totalSubscribers = await Subscriber.count();

  /* 2️⃣ Total Campaigns Sent */
  const totalCampaignsSent = await Campaign.count({
    where: { status: "sent" },
  });

  /* 3️⃣ Opens Per Campaign */
  const opensPerCampaign = await Analytics.findAll({
    attributes: [
      "campaign_id",
      [Sequelize.fn("COUNT", Sequelize.col("Analytics.id")), "opens"],
    ],
    include: [
      {
        model: Campaign,
        attributes: ["title"],
      },
    ],
    group: ["Analytics.campaign_id", "Campaign.id"],
  });

  return {
    totalSubscribers,
    totalCampaignsSent,
    opensPerCampaign: opensPerCampaign.map((row) => ({
      campaignTitle: row.Campaign.title,
      opens: row.get("opens"),
    })),
  };
};
