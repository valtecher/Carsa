import sequelize, { Op } from 'sequelize';
import db from '../../../database/models';
import { hashPassword } from '../../utils/authUtils';

const getClientByEmail = async (email: string) => {
    const client = await db.Client.findOne({
        attributes: [
            [sequelize.col('person_id'), 'client_id'],
            [sequelize.col('Person.first_name'), 'first_name'],
            [sequelize.col('Person.last_name'), 'last_name'],
            'email',
            'phone',
            'password'
        ],
        where: { email },
        include: [
            { model: db.Person, required: true, attributes: [] },
            { model: db.Location }
        ],
        raw: true,
        nest: true
    });

    return client;
}

const isClientExist = async ({ email, phone }) => {
    const existingClient = await db.Client.findOne({
        where: {
            [Op.or]: [
                { email },
                { phone }
            ]
        }
    });

    return !!existingClient;
}

const createClient = async ({ first_name, last_name, email, phone, password }) => {
    const newPerson = await db.Person.create({
        first_name,
        last_name
    });

    await db.Client.create({
        person_id: newPerson.id,
        email,
        phone,
        password: hashPassword(password),
    });

    return await db.Client.findByPk(newPerson.id, {
        attributes: [
            [sequelize.col('person_id'), 'client_id'],
            [sequelize.col('Person.first_name'), 'first_name'],
            [sequelize.col('Person.last_name'), 'last_name'],
            'email',
            'phone'
        ],
        include: [
            { model: db.Person, required: true, attributes: [] },
        ],
        raw: true,
        nest: true
    });
}

export default {
    getClientByEmail,
    isClientExist,
    createClient
}
