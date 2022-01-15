import { TechnicianType } from "./technitian";
import { IReport as Report } from './report'
export interface ReportOverview {
  id: string;   
  car_id: string; 
  date: Date; 
  Technician: TechnicianType
  Reports: Array<Report>

}
