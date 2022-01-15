import db from "../../database/models";

const getTechnicianById = async (id:string) => {
  return await db.Technicians.findByPk(id)
}

const getRandomTechnician = async () => {
    const technicians = await db.Technician.findAll();
    const randomTechnician =  technicians[Math.floor(Math.random() * technicians.length)];
    return randomTechnician;


}



module.exports = {
  getTechnicianById,
  getRandomTechnician,
}