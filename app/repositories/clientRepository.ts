import sequelize, {Op} from 'sequelize'
import db from '../../database/models'
import {hashPassword} from '../utils/authUtils'

const getAllClients = async () => {
    return await db.Client.findAll({
        attributes: [
            'person_id',
            [sequelize.col('Person.first_name'), 'first_name'],
            [sequelize.col('Person.last_name'), 'last_name'],
            'email',
            'phone',
        ],
        include: [
            {model: db.Person, required: true, attributes: []},
            {model: db.Location, attributes: {exclude: ['createdAt', 'updatedAt']}}
        ]
    })
}

const getClientById = async (id: string) => {
    return await db.Client.findByPk(id, {
        attributes: [
            'person_id',
            [sequelize.col('Person.first_name'), 'first_name'],
            [sequelize.col('Person.last_name'), 'last_name'],
            'email',
            'phone',
        ],

        include: [
            {model: db.Person, required: true, attributes: []},
            {model: db.Location, attributes: {exclude: ['createdAt', 'updatedAt']}}
        ]
    })
}

const getClientByEmail = async (email: string) => {
    const client = await db.Client.findOne({
        attributes: [
            'person_id',
            [sequelize.col('Person.first_name'), 'first_name'],
            [sequelize.col('Person.last_name'), 'last_name'],
            'email',
            'phone',
            'password'
        ],

        where: {email},

        include: [
            {model: db.Person, required: true, attributes: []},
            {model: db.Location, attributes: {exclude: ['createdAt', 'updatedAt']}}
        ]
    })

    return client
}

const addClient = async (clientBody: any) => {
    try {
        const existingClient = await db.Client.findOne({
            where: {
                [Op.or]: [
                    {email: clientBody.email},
                    {phone: clientBody.phone}
                ]
            }
        })

        if (!existingClient) {
            const newPerson = await db.Person.create({
                first_name: clientBody.first_name,
                last_name: clientBody.last_name
            })

            const newClient = await db.Client.create({
                person_id: newPerson.id,
                email: clientBody.email,
                phone: clientBody.phone,
                password: hashPassword(clientBody.password),
            })

            const newClientObject = {
                person_id: newPerson.id,
                ...clientBody
            }

            delete newClientObject.password

            return newClientObject
        }
    } catch (err: any) {
        console.log(err, ' Error')
        return false;
    }

    return false
}

const deleteClientById = async (id: string) => {
    // @ts-ignore
    return await db.Client.destroy({
        where: {person_id: id}
    })
}


module.exports =  {
    getAllClients,
    getClientById,
    getClientByEmail,
    addClient,
    deleteClientById
}