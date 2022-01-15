import db from '../../database/models'
import {ParsedUrlQuery} from "querystring"

const getAllLocations = async (query: ParsedUrlQuery) => {
    return await db.Location.findAll({
        attributes: [
            'id',
            'country',
            'state',
            'city',
            'postal_code',
            'street',
            'house_number',
            'apartment_number',
        ],
        where: {...query}
    })
}

const getLocationById = async (id: string) => {
    return await db.Location.findByPk(id, {
        attributes: [
            'id',
            'country',
            'state',
            'city',
            'postal_code',
            'street',
            'house_number',
            'apartment_number',
        ]
    })
}

const getLocationByName = async (locationString:string) => {
    const city = locationString.split(',')[0];
    const state = locationString.split(',')[locationString.split(',').length - 1];
    const locations = await db.Location.findAll({ where: { city, state }})
    if(locations.length === 0){
        const locationBody = {
            country: 'Poland',
            city: locationString.split(',')[0],
            state: locationString.split(',')[locationString.split(',').length - 1]

        }
        const addedLocation = await addLocation(locationBody);
        if(addedLocation){
            return addedLocation;
        }
    }
    return locations[0];
}

const addLocation = async (locationBody: any) => {
    const preparedBody = {
        country: locationBody.country,
        state: locationBody.state,
        city: locationBody.city,
        postal_code: locationBody.postal_code ? locationBody.postal_code : null,
        street: locationBody.street ? locationBody.street : null,
        house_number: locationBody.house_number ? locationBody.house_number : null,
        apartment_number: locationBody.apartment_number ? locationBody.apartment_number : null
    }

    const existingLocation = await db.Location.findOne({where: {...preparedBody}})

    if (!existingLocation) {
        let newLocation = await db.Location.create({...preparedBody})

        delete newLocation.dataValues.createdAt
        delete newLocation.dataValues.updatedAt

        return newLocation
    }

    return false
}

const deleteLocationById = async (id: string) => {
    // @ts-ignore
    return await db.Location.destroy({where: {id}})
}

export default {
    getAllLocations,
    getLocationById,
    addLocation,
    deleteLocationById,
    getLocationByName,
}