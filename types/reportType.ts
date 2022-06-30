export const reportTypes = ['Interior', 'Exterior', 'Engine', 'Suspension', 'Legal', 'Transmission'] as const;

export type ReportTypeName = typeof reportTypes;

export interface ReportTypeType {
  id: string;
  name: ReportTypeName;
}

export const isReportTypeName = (name): name is ReportTypeName => reportTypes.includes(name);
