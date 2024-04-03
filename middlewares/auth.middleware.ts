import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByUsername } from "../repositories/user.repository";
import { User } from "../prisma/generated/client";

interface authRequest extends Request {
  user: User;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header("accessToken");
  const secret = process.env.JWT_SECRET;

  try {
    const decoded: any = jwt.verify(String(accessToken), String(secret));
    const user = await findUserByUsername(decoded.username);
    if (!user) return res.status(400).json({ message: "user not found" });
    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
