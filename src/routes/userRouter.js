import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getPermisoModificacion);

export default userRouter;
