import { ReportType as IReportType } from "./reportType";

export interface IReport {
  id?: string; 
  condition: number; 
  details: string; 
  overview_id?: string;
  ReportType?: IReportType;
}

export interface IReportWithType extends IReport{
  type: string;
}