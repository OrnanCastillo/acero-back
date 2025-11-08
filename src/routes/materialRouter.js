import { Router } from 'express';
import materialController from '../controllers/materialController.js';

const materialRouter = Router();

materialRouter.post('/', materialController.createMaterial);

materialRouter.get('/', materialController.getAllMaterial);

materialRouter.get('/types', materialController.getMovementsType);

materialRouter.get('/historial', materialController.getMovementsHistorial);

materialRouter.get('/plates', materialController.getAllPlates);

materialRouter.get('/:id', materialController.getMaterialById);

materialRouter.put('/:id', materialController.updateMaterial);

materialRouter.put('/plate/:id', materialController.updatePlate);

materialRouter.post('/plate', materialController.createPlates);


export default materialRouter;
