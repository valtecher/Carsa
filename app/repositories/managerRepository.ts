import db from "../../database/models"

const getRandomManager = async ()  => {
  const managers = await db.Manager.findAll()
  const randomInt = Math.floor(Math.random() * managers.length);
  console.log(randomInt, ' managers:  ', managers)
  return managers[randomInt]

}

export default {
  getRandomManager
}