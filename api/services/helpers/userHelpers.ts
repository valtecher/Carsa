import db from '../../../database/models';

const getSelectorDataById = async (selectorId: string) => {
  const selector = await db.CarSelector.findByPk(selectorId, {
    attributes: ['person_id', 'Employee.Person.first_name', 'Employee.Person.last_name', 'Employee.email'],
    include: [
      {
        model: db.Employee,
        attributes: [],
        include: {
          model: db.Person,
          attributes: []
        }
      }
    ],
    raw: true,
    nest: true
  });

  return selector;
};

const getClientDataById = async (clientId: string) => {
  const selector = await db.Client.findByPk(clientId, {
    attributes: ['person_id', 'Person.first_name', 'Person.last_name', 'email', 'phone'],
    include: [
      {
        model: db.Person,
        attributes: []
      }
    ],
    raw: true,
    nest: true
  });

  return selector;
};

export default {
  getSelectorDataById,
  getClientDataById
};
