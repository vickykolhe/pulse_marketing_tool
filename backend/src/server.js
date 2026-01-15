import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
