"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
function errorHandler(err, req, res, _next) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({ operationalError: err.message });
    }
    console.error("unexpected error: ", err);
    return res
        .status(500)
        .json({ message: "something went wrong, please try later" });
}
exports.default = errorHandler;
