import { Request, Response } from 'express';
import { IReport } from '../../client_app/src/utils/models/Report';
import { ReportType} from '../../types/report';
import reportHelpers from '../services/helpers/reportHelpers';


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
  saveAndUpdateReports,
  updateSingleReport
}