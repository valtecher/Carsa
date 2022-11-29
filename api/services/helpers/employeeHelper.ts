import sequelize from "sequelize";
import db from "../../../database/models"

const getEmployeesPosition = async (person_id:string) => {
  const carSelectors = await  getAllCarSelectors();
  const technicians = await  getAllTechnicians();
  const technician = technicians.find((technician) => technician.person_id == person_id);
  const carSelector = carSelectors.find((carSelector)=> carSelector.person_id == person_id);
  if(technician) return 'Technician';
  if(carSelector) return 'CarSelector';
}


const getAllCarSelectors  = async () => {
  return await db.CarSelector.findAll()
}

const getAllTechnicians = async () => {
  return await db.Technician.findAll()
}

const getTechnicianById = async (technicianId:string) => {
  return await db.Technician.findByPk(technicianId, {
    include: [db.Location]
  }) 
}

const getEmployeeByEmail = async (email:string) => {
  const employee = await db.Employee.findOne({
    include: [
      db.Person
    ],
    attributes: [
      [sequelize.col('Person.id'), 'person_id'],
      [sequelize.col('Person.first_name'), 'first_name'],
      [sequelize.col('Person.last_name'), 'last_name'],
      'email',
      'password'
    ],
    where: { email },
    raw: true,
    nest: true,
  }).catch((e:any) =>{ 
    console.error('Error occurred', e);
  });

  if ( employee ) {
    const position = await getEmployeesPosition(employee.person_id);
    employee.role = position;
  }
  
  return employee;
}

export default {
    getEmployeeByEmail,
    getTechnicianById,
}