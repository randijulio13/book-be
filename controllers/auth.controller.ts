import { Request, Response } from "express";
import prisma from "../lib/prisma";
// import bcrypt from "bcrypt";
import { findUserByUsername } from "../repositories/user.repository";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, password, name } = req.body;

  const user = await findUserByUsername(username);
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }
  
  // bcrypt error when deployed on vercel server
  // const hashedPass = await bcrypt.hash(password, 10);
  const hashedPass = password;

  await prisma.user.create({
    data: {
      username,
      name,
      password: hashedPass,
    },
  });

  res.json({
    message: "success",
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(400).json({
      message: "wrong username or password",
    });
  }

  // bcrypt error when deployed on vercel server
  // const isValid = await bcrypt.compare(password, user?.password);
  const isValid = password == user?.password;

  if (!isValid) {
    return res.status(400).json({
      message: "wrong username or password",
    });
  }

  const token = jwt.sign(
    { name: user.name, username: user.username },
    String(process.env.JWT_SECRET)
  );

  res.json({
    accessToken: token,
  });
};
