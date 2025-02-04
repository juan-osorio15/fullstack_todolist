import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { insertUserToDb, fetchUserByEmail } from "../models/authModels";
import { userExists, usernameExists } from "../utils/dbUtils";
import errorHandler from "../middleware/errorHandler";
import AppError from "../utils/AppError";

dotenv.config();

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, email, password } = req.body;

    const isUser = await userExists(email);
    const isUsernameTaken = await usernameExists(username);

    if (isUser) {
      return next(new AppError("user already exists with this email", 400));
    }
    if (isUsernameTaken) {
      return next(new AppError("username is already taken", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUserRows = await insertUserToDb(username, email, hashedPwd);

    res.status(201).json({ message: "user registered", user: newUserRows[0] });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    const userResultRows = await fetchUserByEmail(email);

    if (userResultRows.length === 0) {
      return next(new AppError("no user found with this email", 404));
    }

    const user = userResultRows[0];
    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid) {
      return next(new AppError("invalid credentials", 401));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "6h",
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}
