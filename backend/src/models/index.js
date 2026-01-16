import sequelize from "../config/database.js";

import Campaign from "./Campaign.js";
import Subscriber from "./Subscriber.js";
import Analytics from "./Analytics.js";

/* Campaign ↔ Analytics */
Campaign.hasMany(Analytics, { foreignKey: "campaign_id" });
Analytics.belongsTo(Campaign, { foreignKey: "campaign_id" });

/* Subscriber ↔ Analytics */
Subscriber.hasMany(Analytics, { foreignKey: "subscriber_id" });
Analytics.belongsTo(Subscriber, { foreignKey: "subscriber_id" });

export { sequelize, Campaign, Subscriber, Analytics };
