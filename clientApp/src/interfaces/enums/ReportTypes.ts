const Engine = 'Engine'
const Inside = 'Interior'
const Outside = 'Outside'
const Suspension = 'Suspension'

export interface IReportTypes {
  Engine: string,
  Suspension: string,
  Inside: string,
  Outside: string,
}

export const reportTypes:IReportTypes = {
  Engine,
  Suspension,
  Inside,
  Outside,
}