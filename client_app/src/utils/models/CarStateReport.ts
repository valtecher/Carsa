export interface CarStateReport {
  id?: string,
  exterior?: CarStateReportItem,
  interior?: CarStateReportItem,
  engine?: CarStateReportItem,
  suspension?: CarStateReportItem,
  gearbox?: CarStateReportItem,
}

export interface CarStateReportItem {
  id?: string, 
  state: number, 
  description?: string, 
}

