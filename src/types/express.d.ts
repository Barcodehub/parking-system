import { Request } from "express";
import { User } from "../models/user.model"; // Ajusta la ruta según tu estructura

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
