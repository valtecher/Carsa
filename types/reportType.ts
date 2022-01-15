export interface ReportTypeType {
    id: string
    name: ReportTypeName
}

export const reportTypes = ['Interior', 'Exterior', 'Engine', 'Suspension', 'Legal', 'Transmission'] as const
export type  ReportTypeName = (typeof reportTypes)
export const isReportTypeName = (name: any): name is ReportTypeName => reportTypes.includes(name)