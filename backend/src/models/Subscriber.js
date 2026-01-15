import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subscriber = sequelize.define("Subscriber", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Subscriber;
