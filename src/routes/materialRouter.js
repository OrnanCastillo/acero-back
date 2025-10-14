import { Router } from 'express';
import materialController from '../controllers/materialController.js';

const materialRouter = Router();

materialRouter.post('/', materialController.createMaterial);

materialRouter.get('/', materialController.getAllMaterial);

materialRouter.get('/types', materialController.getMovementsType);

materialRouter.get('/historial', materialController.getMovementsHistorial);

materialRouter.get('/:id', materialController.getMaterialById);

materialRouter.put('/:id', materialController.updateMaterial);


export default materialRouter;
