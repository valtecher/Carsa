import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import url from 'url'

import locationRepository from '../repositories/locationRepository'


const getAllLocations = async (req: Request, res: Response, next: NextFunction) => {
    const allowedParams = ['country', 'state', 'city', 'postal_code', 'street', 'house_number', 'apartment_number']
    const url_parts = url.parse(req.url, true)
    const query = url_parts.query

    if (Object.keys(query).every(key => allowedParams.includes(key))) {
        const locations = await locationRepository.getAllLocations(query)
        res.status(StatusCodes.OK).json(locations)
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'One or more passed params are not allowed'})
    }
}

const getLocationById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const location = await locationRepository.getLocationById(id)

    location
        ? res.status(StatusCodes.OK).json(location)
        : res.status(StatusCodes.NOT_FOUND).json({message: 'There is no location with provided id'})
}

const addLocation = async (req: Request, res: Response, next: NextFunction) => {
    const locationBody = req.body

    const location = await locationRepository.addLocation(locationBody)

    location
        ? res.status(StatusCodes.OK).json(location)
        : res.status(StatusCodes.BAD_REQUEST).json({message: 'Location is already exists'})
}

const deleteLocationById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const deleted = await locationRepository.deleteLocationById(id)

    deleted
        ? res.send(StatusCodes.OK)
        : res.status(StatusCodes.BAD_REQUEST).json({message: 'Location with provided id does not exist'})
}


export default {
    getAllLocations,
    getLocationById,
    addLocation,
    deleteLocationById
}