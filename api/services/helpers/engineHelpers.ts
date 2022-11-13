import db from "../../../database/models"
import { EngineType } from "../../../types/engine"

export const getEngineById = async (id:string) => {
  return await db.Engine.findByPk(id)
}

export const updateEngine = async (engine: EngineType) => {
  const engineToUpdate = await getEngineById(engine.id || '');
  return await engineToUpdate.update(engine);
}