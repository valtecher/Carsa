import db from "../../../database/models"
import { LocationType } from "../../../types/location"

export const getLocationById = async (id:string) => {
  return await db.Location.findByPk(id)
}

export const updateLocation = async (location: LocationType) =>  {
  const locationToUpdate = await getLocationById(location.id);
  console.log('L:KJIOJHUYGTYFIGUHIJOKO: ', location);
  return await locationToUpdate.update(location);
  
}