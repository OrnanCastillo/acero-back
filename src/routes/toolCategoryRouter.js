import { Router } from 'express';
import categoryController from '../controllers/toolCategoryController.js'; 

const categoryRouter = Router();

categoryRouter.post('/', categoryController.createCategory);

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/:id', categoryController.getCategoryById);

categoryRouter.put('/:id', categoryController.updateCategory);

export default categoryRouter;
