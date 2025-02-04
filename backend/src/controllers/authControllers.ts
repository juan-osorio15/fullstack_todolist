import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database";
import dotenv from "dotenv";
import { insertUserToDb, fetchUserByEmail } from "../models/authModels";
import { userExists, usernameExists } from "../utils/dbUtils";

dotenv.config();

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body;

    const isUser = await userExists(email);
    const isUsernameTaken = await usernameExists(username);

    if (isUser) {
      res.status(400).json({ message: "user already exists with this email" });
      return;
    }
    if (isUsernameTaken) {
      res.status(400).json({ message: "username is already taken" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUserRows = await insertUserToDb(username, email, hashedPwd);

    res.status(201).json({ message: "user registered", user: newUserRows[0] });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const userResultRows = await fetchUserByEmail(email);

    if (userResultRows.length === 0) {
      res.status(400).json({ message: "no user found with this email" });
      return;
    }

    const user = userResultRows[0];
    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "6h",
    });

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}
