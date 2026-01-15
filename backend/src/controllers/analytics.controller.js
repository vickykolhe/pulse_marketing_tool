import { getDashboardAnalyticsService } from "../services/analytics.service.js";

export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const data = await getDashboardAnalyticsService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
