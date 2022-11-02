import sequelize from 'sequelize';
import { IReport } from '../../../client_app/src/utils/models/Report';
import db from '../../../database/models';

const getAllReports = async () => {
  return await db.ReportOverview.findAll();
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

const createOrUpdateReports = (reports:Array<IReport>) => {
  
}

export default {
  getAllReports,
  getRecentCarReports,
  createOrUpdateReports,
};
