import { Router } from 'express';
import carsController from '../controllers/carsController';
import { validateCarId, validateCreateCar, validateUpdateCar } from '../schemas/carSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

router.get('/list', carsController.getAllCars);

router.get('/getclientcars/:clientId', carsController.getClientCars)

router.get('/techniciancars/:id', carsController.getCarsForTechnician)

router.get('/:carId', validateCarId, validateRequestSchema, carsController.getCarById);

router.post('/', validateCreateCar, validateRequestSchema, carsController.createCar);

router.put('/:carId', validateCarId, carsController.updateCarById);

router.delete('/:carId', validateCarId, validateRequestSchema, carsController.deleteCarById);

export default router;
