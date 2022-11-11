import { IReport } from "./Report";
import { ITechnician } from "./Technician";
export interface IReportOverview {
  id: string, 
  technician: ITechnician | string , 
  car_id: string, 
  date: string, 
  Reports: Array<IReport>
};