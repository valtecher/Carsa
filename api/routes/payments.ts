import { Router } from 'express';
import paymentsController from '../controllers/paymentsController';


const router = Router();

router.get('/client/:id', paymentsController.getClientPayments);


export default router;
