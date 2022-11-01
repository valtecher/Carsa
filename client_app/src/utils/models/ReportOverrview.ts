import { IReport } from "./Report";
import { ITechnician } from "./Technician";
export interface IReportOverview {
  id: string, 
  technician: ITechnician, 
  car_id: string, 
  date: string, 
  Reports: Array<IReport>
};