import app from "./app.js";
import sequelize from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
