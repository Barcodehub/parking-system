import { Request, Response } from "express";
import { login } from "../services/auth.service";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ message: errMessage });
  }
};
