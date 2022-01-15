import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'

const jwt = require('jsonwebtoken')
const clientRepository = require('../repositories/clientRepository')


const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    const clients = await clientRepository.getAllClients();
    console.log(req.headers)
    res.json(clients)
}

const getClientById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const client = await clientRepository.getClientById(id)

    client
        ? res.status(StatusCodes.OK).json(client)
        : res.status(StatusCodes.NOT_FOUND).json({message: 'There is no client with provided id'})
}

const createClient = async (req: Request, res: Response, next: NextFunction) => {
    const clientBody = req.body;
    const createdClient = await clientRepository.addClient(clientBody)

    if (createdClient) {
        const token = jwt.sign({user: createdClient}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        res.status(StatusCodes.CREATED).json({accessToken: token, data: createdClient})
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Client is already exists'})
    }
}

const deleteClientById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const isDeleted = await clientRepository.deleteClientById(id)

    isDeleted
        ? res.send(StatusCodes.OK)
        : res.status(StatusCodes.NOT_FOUND).json({message: 'There is no client with such id'})
}

export default {
    getAllClients,
    getClientById,
    createClient,
    deleteClientById
}