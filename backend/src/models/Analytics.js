import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Analytics = sequelize.define("Analytics", {
  openedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Analytics;
