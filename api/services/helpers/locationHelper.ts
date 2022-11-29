import db from "../../../database/models"
import { LocationType } from "../../../types/location"

export const getLocationById = async (id:string) => {
  return await db.Location.findByPk(id)
}

export const getLocationByState = async (location: string) => {
  const [street, powiat, state] = location.split(',');
  const trimmedState:string = state?.replace('(Polska)', '')
  const locationFound = await db.Location.findAll({ 
    where: {
      state: trimmedState || 'Polska'
    }
  })

  if(locationFound.length === 0) {
    return await db.Location.findAll({
      where: {
        country: 'Polska'
      }
    });
  }

  return locationFound;
}

export const updateLocation = async (location: LocationType) =>  {
  const locationToUpdate = await getLocationById(location.id);
  return await locationToUpdate.update(location);
  
}