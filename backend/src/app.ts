import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
