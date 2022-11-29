import sequelize, { Op } from 'sequelize';
import db from '../../../database/models';
import { hashPassword } from '../utils/authUtils';
import { CreatedClient } from '../../DTOs/createdClient';

interface ClientByEmail {
  client_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  role?: string; 
}

const getClientByEmail = async (email: string): Promise<ClientByEmail> => {
  const client = await db.Client.findOne({
    include: [
      db.Person
    ],
    attributes: [
      [sequelize.col('Person.id'), 'client_id'],
      [sequelize.col('Person.first_name'), 'first_name'],
      [sequelize.col('Person.last_name'), 'last_name'],
      'email',
      'phone',
      'password'
    ],
    where: { email },
    raw: true,
    nest: true,
  }).catch((e:any) =>{ 
    console.error('Error occurred', e);
  });

  return client;
};

const isClientExist = async ({ email, phone }): Promise<boolean> => {
  const existingClient = await db.Client.findOne({
    where: {
      [Op.or]: [{ email }, { phone }]
    }
  });

  return !!existingClient;
};

const createClient = async ({ first_name, last_name, email, phone, password }): Promise<CreatedClient> => {
  const newPerson = await db.Person.create({
    first_name,
    last_name
  });

  await db.Client.create({
    person_id: newPerson.id,
    email,
    phone,
    password: hashPassword(password)
  });

  return await db.Client.findByPk(newPerson.id, {
    attributes: [
      [sequelize.col('person_id'), 'client_id'],
      [sequelize.col('Person.first_name'), 'first_name'],
      [sequelize.col('Person.last_name'), 'last_name'],
      'email',
      'phone'
    ],
    include: [{ model: db.Person, required: true, attributes: [] }],
    raw: true,
    nest: true
  });
};

export default {
  getClientByEmail,
  isClientExist,
  createClient
};
