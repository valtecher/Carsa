import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import equipmentRepository from '../repositories/equipmentRepository'

const getAllEquipments = async (req: Request, res: Response) => {
    const name = req.query.name as string

    const equipments = await equipmentRepository.getAllEquipments(name)
    return res.json(equipments)
}

const getEquipmentById = async (req: Request, res: Response) => {
    const id = req.params.id
    const equipment = await equipmentRepository.getEquipmentById(id)

    return res.json(equipment)
}

const addEquipment = async (req: Request, res: Response) => {
    const name = req.body.name
    const [equipment, isCreated] = await equipmentRepository.creteEquipment(name)

    return isCreated
        ? res.status(StatusCodes.CREATED).json(equipment)
        : res.status(StatusCodes.CONFLICT).json(equipment)
}

const editEquipment = async (req: Request, res: Response) => {
    const id = req.params.id
    const equipmentBody = req.body

    const [equipment, isEdited, message] = await equipmentRepository.updateEquipment(id, equipmentBody)

    if(equipment === null)
        return res.status(StatusCodes.BAD_REQUEST).json({message})

    return isEdited
        ? res.json(equipment)
        : res.status(StatusCodes.CONFLICT).json(equipment)
}

const deleteEquipmentById = async (req: Request, res: Response) => {
    const id = req.params.id

    const deleted = await equipmentRepository.deleteEquipmentById(id)

    return deleted

        ? res.sendStatus(StatusCodes.OK)
        : res.status(StatusCodes.BAD_REQUEST).json({message: 'Equipment with provided id does not exist'})
}

export default {
    getAllEquipments,
    getEquipmentById,
    addEquipment,
    deleteEquipmentById,
    editEquipment
}