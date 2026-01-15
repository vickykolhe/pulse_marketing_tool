// export const getSubscribers = (req, res) => {
//   res.json({
//     message: "Subscribers endpoint working",
//   });
// };

import {
  createSubscriberService,
  getSubscribersService,
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
