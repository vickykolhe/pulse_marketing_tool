import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Campaign = sequelize.define("Campaign", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailSubject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("draft", "sent"),
    defaultValue: "draft",
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Campaign;
