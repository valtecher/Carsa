import db from '../../database/models'
import sequelize, {Optional} from 'sequelize'
import {ParsedUrlQuery} from 'querystring'
const overviewRepository = require('./overviewRepository');

const getAllReports = async (query: ParsedUrlQuery) => {
    return await db.Report.findAll({
        attributes: [
            'id',
            'condition',
            'details',
            'overview_id',
            [sequelize.col('ReportType.name'), 'type']
        ],
        include: {
            model: db.ReportType,
            attributes: []
        },
        where: {...query}
    })
}

const getAllReportsForOverview = async (overviewReportId:string) => {
    return await db.Report.findAll({ where: { overview_id: overviewReportId }, include: [{ model: db.ReportType, attributes: [[sequelize.col('name'), 'type']] }] })
}

const getAllReportsForCarByCarId = async (carId:string) => {
    console.log('Car id:', carId)
    const overview = await overviewRepository.getOverviewByCarId(carId);
    console.log(' Report repo: Overview: ', overview[0].id)
    const reports = await db.Report.findAll({where: { overview_id: overview[0].id }, include: [{ model: db.ReportType, attributes: [[sequelize.col('name'), 'type']] }] })
    return reports;

}

const getReportById = async (id: string) => {
    return await db.Report.findByPk(id, {
        attributes: [
            'id',
            'condition',
            'details',
            'overview_id',
            [sequelize.col('ReportType.name'), 'type']
        ],
        include: {
            model: db.ReportType,
            attributes: []
        },
    })
}


const addReport = async (reportBody: any) => {
    const type = await db.ReportType.findOne({where: {name: reportBody.ReportType}})
    console.log(type)
    

    const preparedBody = {
        condition: reportBody.condition,
        details: reportBody.details,
        overview_id: reportBody.overview_id,
        type_id: type.id
    }

    const existingReport = await db.Report.findOne({
        where: {
            overview_id: preparedBody.overview_id,
            type_id: preparedBody.type_id
        }
    })

    if (!existingReport) {
        let newReport = await db.Report.create({...preparedBody})

        delete newReport.dataValues.createdAt
        delete newReport.dataValues.updatedAt

        return [newReport, null]
    }

    return [null, 'Report is already exists']
}

const alterReport = async (reportBody: any) => {
    const existingReport = await db.Report.findByPk(reportBody.id)

    if (existingReport) {
        if (reportBody.hasOwnProperty('type')) {
            reportBody.type_id = db.ReportType.findOne({where: {name: reportBody.type}}).id
        }

        const allowedProps = ['condition', 'details', 'type_id']

        const filteredBody = Object.keys(reportBody)
            .filter(key => allowedProps.includes(key))
            .reduce((obj: any, key) => {
                obj[key] = reportBody[key]
                return obj
            }, {})

        const isUpdated = await db.Report.update({...filteredBody}, {where: {id: reportBody.id}})

        if (isUpdated) {
            const updatedReport = await getReportById(reportBody.id)
            return [updatedReport, null]
        }
    }

    return [null, 'There is no report with provided id']
}

const deleteReportById = async (id: string) => {
    // @ts-ignore
    const deleted = await db.Report.destroy({where: {id}})

    return deleted ? [deleted, null] : [deleted, 'There is no report with provided id']
}

export default {
    getAllReports,
    getAllReportsForCarByCarId,
    getAllReportsForOverview,
    getReportById,
    addReport,
    alterReport,
    deleteReportById
}