export enum IReportType {
  None = 'None',
  Engine = 'Engine',
  Gearbox = 'GearBox',
  Interior = 'Inside',
  Exterior = 'Exterior',
  Suspension = 'Suspension',
}

export interface IReport {
  id?:string,
  condition: number, 
  details: string,
  overview_id: string, 
  type: IReportType,
  type_id: string,
  ReportType?: {id: string, name: string}
}