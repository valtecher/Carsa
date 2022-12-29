import { Router } from 'express';
import reportsController from '../controllers/reportController';


const router = Router();

router.get('/:car_id', reportsController.getAllReportForCar);
router.post('/save', reportsController.saveAndUpdateReports);
router.put('/update', reportsController.updateSingleReport);


export default router;
