import db from '../../database/models'
import sequelize, {Op} from 'sequelize'

const getAllEquipments = async (name?: string) => {
    if (!name) {
        return await db.Equipment.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
    } else {
        return await db.Equipment.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {name}
        })
    }
}

const getEquipmentById = async (id: string) => {
    return await db.Equipment.findByPk(id, {
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}


const creteEquipment = async (name: string) => {
    const existingEquipment = await db.Equipment.findOne({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        where: {name}
    })

    if (existingEquipment) {
        return [existingEquipment, false]
    } else {
        const newEquipment = await db.Equipment.create({name})
        delete newEquipment.dataValues.createdAt
        delete newEquipment.dataValues.updatedAt

        return [newEquipment, true]
    }
}

const updateEquipment = async (id: string, body: any) => {
    const equipmentToUpdate = await db.Equipment.findByPk(id)

    if (!equipmentToUpdate) return [null, false, 'Equipment with provided id does not exist']

    const existingEquipment = await db.Equipment.findOne({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        where: {name: body.name}
    })

    if (existingEquipment) {
        return [null, false, 'Equipment with such name is already exists']
    } else {
        equipmentToUpdate.set({
            name: body.name
        })

        await equipmentToUpdate.save()
        delete equipmentToUpdate.dataValues.createdAt
        delete equipmentToUpdate.dataValues.updatedAt

        return [equipmentToUpdate, true]
    }
}

const deleteEquipmentById = async (id: string) => {
    const equipment = await db.Equipment.findByPk(id)

    if (!equipment) return false

    await equipment.destroy()
    return true
}


export default {
    getAllEquipments,
    getEquipmentById,
    creteEquipment,
    updateEquipment,
    deleteEquipmentById
}