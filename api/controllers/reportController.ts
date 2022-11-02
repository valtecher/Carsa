import { Request, Response } from 'express';
import reportHelpers from '../services/helpers/reportHelpers';


const saveAndUpdateReports = async (req:Request, res:Response) => {
  const reports = req.body.reports;
  const result = await reportHelpers.createOrUpdateReports(reports)
  res.json({ test: 'test' })
}

export default {
  saveAndUpdateReports
}