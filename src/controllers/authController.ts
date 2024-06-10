import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const check = await User.findOne({ username });
  if (check) {
    return res.status(400).send({ message: "Username already exists" });
  }
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ message: "Invalid username or password" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.send({ token });
};
