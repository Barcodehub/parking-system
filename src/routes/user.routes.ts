import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import prisma from '../config/database';

const router = Router();

// Crea las instancias correctamente
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Configura las rutas
router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));

export default router;