import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import url from 'url'
import { ReportOverviewType } from '../../types/reportOverview'
import { TechnicianType } from '../../types/technician';
const employeeRepository = require('../repositories/employeeRepository');


const overviewRepository = require('../repositories/overviewRepository')

const getAllOverviews = async (req: Request, res: Response, next: NextFunction) => {
    const allowedParams = ['car_id', 'technician_id', 'date']
    const url_parts = url.parse(req.url, true)
    const query = url_parts.query

    if (Object.keys(query).every(key => allowedParams.includes(key))) {
        const overviews = await overviewRepository.getAllOverviews(query)
        res.status(StatusCodes.OK).json(overviews)
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'One or more passed params are not allowed'})
    }
}

const getOverviewById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const overview = await overviewRepository.getOverviewById(id);

    overview? 
        res.status(StatusCodes.OK).json(overview)
        : res.status(StatusCodes.NOT_FOUND).json({message: 'There is no location with provided id'})
}

const getOverviewByCarId = async ( req:Request, res:Response, next: NextFunction ) => {
    const carId = req.params.carId;
    const foundOverviews = await overviewRepository.getOverviewByCarId(carId);
    if(foundOverviews.length === 0){ 
        const technician:TechnicianType = await employeeRepository.getRandomTechnician();
        const reportOverviewBody:ReportOverviewType = {
            date: new Date(),
            car_id: carId,
            technician_id: technician.person_id,
        }
        const addedReportOverview = await overviewRepository.addOverview(reportOverviewBody);
        console.log('Added report: ', addedReportOverview)
        res.json( addedReportOverview);
    }

    res.json(foundOverviews[0]);
}

const addOverview = async (req: Request, res: Response, next: NextFunction) => {
    const overviewBody = req.body

    const overview = await overviewRepository.addOverview(overviewBody)

    res.status(StatusCodes.CREATED).json(overview)
}


const deleteOverviewById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const deleted = await overviewRepository.deleteOverviewById(id)

    deleted
        ? res.send(StatusCodes.OK)
        : res.status(StatusCodes.BAD_REQUEST).json({message: 'Overview with provided id does not exist'})
}

export default {
    getAllOverviews,
    getOverviewByCarId,
    getOverviewById,
    addOverview,
    deleteOverviewById
}