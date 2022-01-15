import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
const configurationRepository = require('../repositories/configurationRepository')


const getAllConfigurations = async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit)

    if (page && limit) {
        const offset = (page - 1) * limit
        const orders = await configurationRepository.getAllConfigurations(limit, offset)
        return res.json(orders)
    } else {
        const orders = await configurationRepository.getAllConfigurations()
        return res.json(orders)
    }
}

const getConfigurationById = async (req: Request, res: Response) => {
    const id = req.params.id
    const configuration = await configurationRepository.getConfigurationById(id)

    return res.json(configuration || {})
}

const addConfiguration = async (req: Request, res: Response) => {
    const configurationBody = req.body
    const newConfiguration = await configurationRepository.createConfiguration(configurationBody)

    return res.sendStatus(StatusCodes.CREATED).json(newConfiguration)
}

const editConfigurationById = async (req: Request, res: Response) => {
    const id = req.params.id
    const configurationBody = req.body

    const [changedConfiguration, message] = await configurationRepository.updateConfigurationById(id, configurationBody)

    return changedConfiguration
        ? res.json(changedConfiguration)
        : res.status(StatusCodes.BAD_REQUEST).json({message})
}

const deleteConfigurationById = async (req: Request, res: Response) => {
    const id = req.params.id
    await configurationRepository.deleteConfigurationById(id)

    return res.sendStatus(StatusCodes.OK)
}

export default {
    getAllConfigurations,
    getConfigurationById,
    addConfiguration,
    editConfigurationById,
    deleteConfigurationById
}