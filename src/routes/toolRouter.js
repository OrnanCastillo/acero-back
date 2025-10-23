import { Router } from 'express';
import toolController from '../controllers/toolController.js';

const toolRouter = Router();

toolRouter.post('/', toolController.createTool);

toolRouter.get('/', toolController.getAllTools);

toolRouter.get('/locations', toolController.getAllLocations);

toolRouter.get('/:id', toolController.getCategoryById);

toolRouter.put('/:id', toolController.updateTool);

toolRouter.patch('/disable/:id', toolController.disableTool);

export default toolRouter;
