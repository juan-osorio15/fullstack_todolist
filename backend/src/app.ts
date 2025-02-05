import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import { corsOptions } from "./config/corsConfig";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./docs/swagger.yaml");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
