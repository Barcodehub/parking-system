import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { getUserById } from '../repositories/user.repository';



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // un attach al usuario
    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



export const protect = async (req: Request, res: Response, next: NextFunction) => {
  // Authorization header y cookies
  const token = 
    req.headers.authorization?.replace('Bearer ', '') || 
    req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
  
    const user = await getUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

  
    (req as any).user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    // errors
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Error de autenticación' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};



export const isSocio = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (user?.role !== 'SOCIO') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};