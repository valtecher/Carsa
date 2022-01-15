import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import url from 'url'

import reportRepository from '../repositories/reportRepository'


const getAllReports = async (req: Request, res: Response, next: NextFunction) => {
    const allowedParams = ['condition', 'details', 'overview_id', 'type']
    const url_parts = url.parse(req.url, true)
    const query = url_parts.query

    if (Object.keys(query).every(key => allowedParams.includes(key))) {
        const reports = await reportRepository.getAllReports(query)
        res.status(StatusCodes.OK).json(reports)
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'One or more passed params are not allowed'})
    }
}

const getAllReportsForCar = async (req: Request, res: Response, next: NextFunction) => {
    const carId = req.params.id;
    console.log('Parasm: ', req.params)
    const reports = await reportRepository.getAllReportsForCarByCarId(carId)
    res.json(reports); 
}

const getAllReportsForOverview = async (req: Request, res: Response, next: NextFunction) => {
    const overviewId:string = req.params.id;
    console.log(overviewId, ' this is overview id');
    const reports = await reportRepository.getAllReportsForOverview(overviewId);
    console.log('Reports: ', reports);
    res.json({reports, success: true});
}

const getReportById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const report = await reportRepository.getReportById(id)

    report
        ? res.status(StatusCodes.OK).json(report)
        : res.status(StatusCodes.OK).json({message: 'There is no report with provided id'})
}


const addReport = async (req: Request, res: Response, next: NextFunction) => {
    const reportBody = req.body
    console.log(reportBody);
    const [report, message] = await reportRepository.addReport(reportBody)

    report
        ? res.status(StatusCodes.CREATED).json(report)
        : res.status(StatusCodes.BAD_REQUEST).json({message: message})

}

const editReport = async (req: Request, res: Response, next: NextFunction) => {
    const reportBody = req.body

    const [updatedReport, message] = await reportRepository.alterReport(reportBody)

    updatedReport
        ? res.status(StatusCodes.OK).json(updatedReport)
        : res.status(StatusCodes.NOT_FOUND).json({message: message})
}

const deleteReportById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const [deleted, message] = await reportRepository.deleteReportById(id)

    deleted
        ? res.send(StatusCodes.OK)
        : res.status(StatusCodes.BAD_REQUEST).json({message: message})
}


export default {
    getAllReports,
    getAllReportsForOverview, 
    getAllReportsForCar,
    getOverviewById: getReportById,
    addReport,
    updateReport: editReport,
    deleteReportById
}