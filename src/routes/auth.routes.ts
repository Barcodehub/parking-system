import { Router } from "express";
import { loginUser, createSocio, logout } from "../controllers/auth.controller";

import { protect, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post("/login", loginUser);

router.post('/socio', protect, isAdmin, createSocio);
router.post('/logout', protect, logout);

export default router;
