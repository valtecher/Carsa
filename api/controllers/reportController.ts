import { Request, Response } from 'express';
import reportHelpers from '../services/helpers/reportHelpers';


const getAllReportForCar = async (req:Request, res:Response) => {
  const car_id = req.params.car_id;
  const reports = await reportHelpers.getRecentCarReports(car_id);
  res.json(reports)
}

const saveAndUpdateReports = async (req:Request, res:Response) => {
  const reports = req.body;
  if(reports?.length === 0) {
    res.json({error: 'No reports sent', code: 403})
  } else {
    const result = await reportHelpers.createOrUpdateReports(reports)
    res.json({ ...result })
  }

}

const updateSingleReport = async (req:Request, res: Response) => {
   const updatedReport = await reportHelpers.updateSingleReport(req.body);
   return updatedReport;
}

export default {
  getAllReportForCar,
  saveAndUpdateReports,
  updateSingleReport
}