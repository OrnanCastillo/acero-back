import { Router } from 'express';
import toolController from '../controllers/toolController.js';

const toolRouter = Router();

toolRouter.post('/', toolController.createTool);

toolRouter.get('/', toolController.getAllTools);

toolRouter.get('/:id', toolController.getCategoryById);

toolRouter.put('/:id', toolController.updateTool);

export default toolRouter;
