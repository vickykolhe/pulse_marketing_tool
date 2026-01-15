// export const getSubscribers = (req, res) => {
//   res.json({
//     message: "Subscribers endpoint working",
//   });
// };

import {
  createSubscriberService,
  getSubscribersService,
  bulkCreateSubscribersService,
} from "../services/subscriber.service.js";

/* Create Subscriber */
export const createSubscriber = async (req, res, next) => {
  try {
    const subscriber = await createSubscriberService(req.body);
    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
};

/* Bulk Create Subscribers */
export const bulkCreateSubscribers = async (req, res, next) => {
  try {
    const result = await bulkCreateSubscribersService(req.body);
    res.status(201).json({
      inserted: result.length,
    });
  } catch (error) {
    next(error);
  }
};

/* Get Subscribers */
export const getSubscribers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await getSubscribersService({
      page: Number(page),
      limit: Number(limit),
      search,
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
