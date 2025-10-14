import { Router } from 'express';
import categoryController from '../controllers/materialCategoryController.js'; 

const materialCategoryRouter = Router();

materialCategoryRouter.post('/', categoryController.createCategory);

materialCategoryRouter.get('/', categoryController.getAllCategories);

materialCategoryRouter.get('/:id', categoryController.getCategoryById);

materialCategoryRouter.put('/:id', categoryController.updateCategory);

export default materialCategoryRouter;
