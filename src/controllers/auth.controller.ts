import { NextFunction, Request, Response } from "express";
import {login, registerUser } from "../services/auth.service";
import { CreateUserInput } from "@/types/user.types";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    next(error); //error -> middleware
  }
};

export const createSocio = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error); 
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie('token'); // Si usas JWT en cookies
  return res.json({ message: 'Logout exitoso' });
};