import { Request, Response } from "express";
import {login, registerUser } from "../services/auth.service";

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

export const createSocio = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie('token'); // Si usas JWT en cookies
  return res.json({ message: 'Logout exitoso' });
};