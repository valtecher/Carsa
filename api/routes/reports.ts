import { Router } from 'express';
import reportsController from '../controllers/reportController';


const router = Router();

router.post('/save', reportsController.saveAndUpdateReports);


export default router;
