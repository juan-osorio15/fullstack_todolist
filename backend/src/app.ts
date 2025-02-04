import express, { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
