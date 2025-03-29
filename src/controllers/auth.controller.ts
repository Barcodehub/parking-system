import { Request, Response } from "express";
import {login, registerUser } from "../services/auth.service";
import { CreateUserInput } from "@/types/user.types";
import { ZodError } from 'zod';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      const errMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message: errMessage });
    }
  }
};

export const createSocio = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Validar entrada
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userData: CreateUserInput = { name, email, password };
    const user = await registerUser(userData);
    
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      const errMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message: errMessage });
    }
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie('token'); // Si usas JWT en cookies
  return res.json({ message: 'Logout exitoso' });
};