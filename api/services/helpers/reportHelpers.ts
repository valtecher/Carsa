import sequelize from 'sequelize';
import { IReport } from '../../../client_app/src/utils/models/Report';
import db from '../../../database/models';
import { ReportOverviewType } from '../../../types/reportOverview';

const getAllReports = async () => {
  return await db.ReportOverview.findAll();
}

const getAllReportsByOverviewId = async (overview_id: string) => {
  return await db.Report.findAll({ 
    include: [db.ReportType],
    where: {
      overview_id
    }
  })
}

const getReportOverviewById = async (id:string) => {
  const reportOverview = await db.ReportOverview.findByPk(id);
  return reportOverview;
}

const getRecentCarReports = async (carId: string) => {
  const latestReportOverview = await db.ReportOverview.findOne({
    where: {
      car_id: carId
    },
    order: [['date', 'DESC']],
    raw: true,
    nest: true
  });

  if (!latestReportOverview) {
    return { success: true, reports: [] };
  }

  const reports = await db.Report.findAll({
    attributes: ['id', [sequelize.col('ReportType.name'), 'type'], 'condition', 'details', 'overview_id'],
    where: {
      overview_id: latestReportOverview.id
    },
    include: [{ model: db.ReportType, attributes: [] }],
    raw: true,
    nest: true
  });

  return { success: true, reports };
};

const createOrUpdateReports = async (request:{carId: string, technicianId: string; reports: Array<IReport>}) => {
  if (request?.reports?.[0]?.overview_id) {    
      let reportOverview:ReportOverviewType = await getReportOverviewById(request?.reports?.[0]?.overview_id)
      
      if(!reportOverview) {
        reportOverview = await  createReportOverview({
          car_id: request.carId,
          technician_id: request.technicianId
        });
      }
        
      const existingReports = await getAllReportsByOverviewId(reportOverview!.id || '');
      const existingReportsTypes = existingReports.map((existingReport) => existingReport.ReportType.name);

      existingReports.forEach((existingReport) => {
          const correspondingTypeReport = request.reports.find((report) => report.type === existingReport.ReportType.name); 
          if(correspondingTypeReport) {
            correspondingTypeReport.overview_id = reportOverview.id || '';
              updateReport(correspondingTypeReport, existingReport.id)
          } 
        })
          
        request.reports.forEach((pendingReport) => {
          if(!existingReportsTypes.includes(pendingReport.type)) {
            pendingReport.overview_id = reportOverview.id || '';
            createReport(pendingReport);
          }
        })

        return { success: true, reportOverview }
    }
}

export const createReportOverview = async (reportOverview:ReportOverviewType) => {
  return await db.ReportOverview.create(reportOverview);
}

export const createReport = async (report:IReport) => {
    const reportTypes = await getReportTypes();
    report.type_id = reportTypes.find((reportType) => reportType.name.toLowerCase() === report.type.toLowerCase())?.id;
    return await db.Report.create(report).catch((e) => {
      console.error(e)
    });

}

export const updateSingleReport = async (report:IReport) => {
  return await db.Report.update(report, { 
    where: {
      id: report.id
    }
  });
}

export const updateReport = async (report:IReport, reportIdToUpdate?:string) => {
  const reportTypes = await getReportTypes();
  report.type_id = reportTypes.find((reportType) => reportType.name.toLowerCase() === report.type.toLowerCase())?.id;
  return await db.Report.update(report, {
    where: {
      id: reportIdToUpdate ?? report.id
    }
  })
}

const getReportTypes = async () => {
  return await db.ReportType.findAll();
}

export default {
  getAllReports,
  getRecentCarReports,
  getReportOverviewById,
  getAllReportsByOverviewId,
  createOrUpdateReports,
  updateReport,
  updateSingleReport,
};
