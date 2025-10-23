import { Router } from 'express';
import projectController from '../controllers/projectController.js';

const projectRouter = Router();

projectRouter.post('/', projectController.createProject);

projectRouter.get('/', projectController.getAllProjects);

projectRouter.patch('/:id', projectController.updateProject);

projectRouter.patch('/disable/:id', projectController.disableProject);

export default projectRouter;
