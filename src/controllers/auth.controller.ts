import { Request, Response } from "express";
import {login, registerUser } from "../services/auth.service";


// import { PrismaClient, Role, User } from '@prisma/client';
// import { CustomRequest } from '../interfaces/request.interface';

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


// export const createSocio = async (req: Request, res: Response) => {
//   // Añadir una validación de tipo más directa
//   const user = (req as any).user;

//   try {
//     // Verifica si el usuario autenticado es ADMIN
//     if (!user || user.role !== Role.ADMIN) {
//       return res.status(403).json({ message: "Acceso denegado" });
//     }

//     const { name, email, password } = req.body;

//     // Verifica los datos de entrada
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Todos los campos son obligatorios" });
//     }

//     // Llama al servicio para crear un nuevo socio
//     const newUser = await createSocioService(name, email, password);

//     return res.status(201).json({ message: "Socio creado exitosamente", user: newUser });
//   } catch (error) {
//     console.error("Error al crear socio:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };


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