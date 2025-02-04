import app from "./app";
import pool from "./config/database";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

pool
  .connect()
  .then(() => {
    console.log("Successfully connected to PostgreSQL!");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection failed:", err));
