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
  carId?: string, 
  type: IReportType,
  description: string, 
  grade: number,
}

export const dummyEngineReport:IReport = {
  id: 'eu3o1jwlj2io13',
  carId: 'test',
  type: IReportType.Engine,
  description: "some description",
  grade: 78,
}
export const dummyGearboxReport:IReport = {
  id: 'eu3o1jwlj2io14',
  carId: 'test',
  type: IReportType.Gearbox,
  description: "some description Gearbox",
  grade: 58,
}