"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = require("./config/corsConfig");
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig_1.corsOptions));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/todos", todoRoutes_1.default);
app.use((err, req, res, next) => {
    (0, errorHandler_1.default)(err, req, res, next);
});
exports.default = app;
