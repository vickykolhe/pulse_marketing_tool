import { Subscriber } from "../models/index.js";
import { Op } from "sequelize";

/* Create Single Subscriber */
export const createSubscriberService = async (data) => {
  return await Subscriber.create(data);
};

/* Get Subscribers with Pagination & Search */
export const getSubscribersService = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  const whereClause = search ? { email: { [Op.iLike]: `%${search}%` } } : {};

  return await Subscriber.findAndCountAll({
    where: whereClause,
    limit,
    offset,
  });
};
