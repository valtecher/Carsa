import { Router } from 'express';
import ordersController from '../controllers/ordersController';
import { validateOrderId, validateCreateOrder, validateUpdateOrder } from '../schemas/orderSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

// router.get('/list', ordersController.getAllOrders);

router.get('/client/:clientId', ordersController.getOrdersForClientId);

router.get('/:orderId', validateOrderId, validateRequestSchema, ordersController.getOrderById);

router.post('/',  ordersController.createOrder);

router.post('/car', ordersController.addCarToOrder);

// router.put('/:orderId', validateOrderId, validateUpdateOrder, validateRequestSchema, ordersController.updateOrderById);

// router.delete('/:orderId', validateOrderId, validateRequestSchema, ordersController.deleteOrderById);

export default router;
