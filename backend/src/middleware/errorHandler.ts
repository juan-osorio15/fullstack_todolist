import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response | void {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ operationalError: err.message });
  }

  console.error("unexpected error: ", err);
  return res
    .status(500)
    .json({ message: "something went wrong, please try later" });
}

export default errorHandler;
