import db from "../../database/models"

const getRandomManager = async ()  => {
  const managers = await db.Manager.findAll()
  const randomInt = Math.floor(Math.random() * managers.length);
  return managers[randomInt]

}

export default {
  getRandomManager
}