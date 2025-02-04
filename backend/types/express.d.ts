import { Request } from "express";

declare module "express" {
  interface Request {
    user?: { id: string }; // 👈 Now req.user is recognized by TypeScript!
  }
}
