import Op from 'sequelize/types/lib/operators'
import db from '../../database/models'
import {CarType} from '../../types/car'
import {CarBrandType} from '../../types/carBrand'
import {Car_OrderType} from '../../types/car_order'
import {EngineType} from '../../types/engine'
import {OrderType} from '../../types/order'
import moment from 'moment';
import {CarModelType} from '../../types/carModel'
import {CarGenerationType} from '../../types/carGeneration'

const uuid = require('uuid');

interface OrderWithCars extends OrderType {
    cars: Array<CarType>
}


const createCar = async (carBody: any) => {
    const preparedBody = {
        color: carBody.color,
        vin: carBody.vin || null,
        registrationNumber: carBody.registrationNumber || null,
        description: carBody.description || null,
        mileage: carBody.mileage || '',
        year: carBody.year || '',
        drive: carBody.drive || '',
        transmission: carBody.transmission,
        market_name: carBody.market_name || null,
        marketplace_link: carBody.marketplace_link || null,
        price: carBody.price || '',
        type: carBody.type || '',
        brand_id: carBody.brand_id,
        model_id: carBody.model_id,
        generation_id: carBody.generation_id || null,
        engine_id: carBody.engine_id || null,
        location_id: carBody.location_id || null,
        mainImage: null,
        images: carBody?.images || [],
    }

    const newCar = await db.Car.create({...preparedBody})
    delete newCar.dataValues.createdAt
    delete newCar.dataValues.updatedAt
    return newCar
}

const addCarToOrder = async (carId: string, orderId: string) => {
    const existingOrder = await db.Order.findByPk(orderId)
    const existingCar = await db.Car.findByPk(carId)

    if (!existingCar || !existingOrder)
        return undefined

    if (await db.Car_Order.findOne({where: {order_id: orderId, car_id: carId}}))
        return null

    const CarOrder: Car_OrderType = {
        order_id: orderId,
        car_id: carId,
        start_reservation: new Date(),
        status: 'Created'
    }

    const createdOrder = await db.Car_Order.create({...CarOrder})
    delete createdOrder.dataValues.createdAt
    delete createdOrder.dataValues.updatedAt

    return createdOrder
}

// ---------------------------- CAR EQUIPMENTS ----------------------------
const getCarEquipments = async (carId: string) => {
    return await db.Car.findByPk(carId, {
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: {
            model: db.Equipment,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            as: 'car_equipment',
            through: {attributes: []}
        }
    })
}

const addEquipmentsToCar = async (carId: string, equipments: string[]) => {
    if (!await db.Car.findByPk(carId))
        return [false, 'Car with provided id does not exist']

    for (let i = 0; i < equipments.length; i++) {
        const existingEquipment = await db.Car_Equipment.findOne({
            where: {car_id: carId, equipment_id: equipments[i]}
        })

        if (existingEquipment) continue

        await db.Car_Equipment.create({
            car_id: carId, equipment_id: equipments[i]
        })
    }

    return [true]
}

const deleteCarEquipments = async (carId: string, equipments: string[]) => {
    if (!await db.Car.findByPk(carId))
        return [false, 'Car with provided id does not exist']

    for (let i = 0; i < equipments.length; i++) {
        const existingEquipment = await db.Car_Equipment.findOne({
            where: {car_id: carId, equipment_id: equipments[i]}
        })

        if (!existingEquipment) continue

        // @ts-ignore
        await db.Car_Equipment.destroy({
            where: {car_id: carId, equipment_id: equipments[i]}
        })
    }

    return [true]
}
// ---------------------------- END CAR EQUIPMENTS ----------------------------

const getAllCarsForClient = async (clientId: string) => {
    const cars = await db.Order.findAll({
        where: {client_id: clientId},
        include: [{
            model: db.Car,
            as: 'cars',
            include: [{
                model: db.ReportOverview,
                include: [{model: db.Report, include: [{model: db.ReportType}]}]
            }, {model: db.Engine}, {
                model: db.CarGeneration,
                include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
            }]
        }]
    }).then((res: any) => {
        const tmp: Array<CarType> = res.map((order: OrderWithCars) => {
            return order.cars
        })
        return {cars: tmp};
    })

    return cars

}

const getAllCarBrands = async () => {
    return await db.CarBrand.findAll();
}

const getModelByName = async (modelName: string) => {
    const model = await db.CarModel.findAll({ where: { name: modelName } })
    return model[0]
}

const getAllModelsForBrand = async (brandId: string) => {
    const models: Array<any> = await db.CarModel.findAll({where: {brand_id: brandId}});
    return models;
}

const getAllGenerationsForModelByName = async (model_id:string) => {
    const generations = await db.CarGeneration.findAll({ where: { model_id }  })
    return generations;
}

const getAllGenerationsForModel = async (modelId: string ) => {
    return await db.CarGeneration.findAll({ where: { model_id: modelId } })
}

const getCars = async () => {
    const cars = await db.Car.findAll({
        include: [db.Engine, {model: db.Equipment, as: 'car_equipment'}, {
            model: db.CarGeneration,
            include: [{model: db.CarModel, include: [db.CarBrand]}]
        }]
    });
    return cars;
}

const getCarByIdDb = async (id: string) => {
    const car = await db.Car.findByPk(id, {include: [db.Engine, {
        model: db.CarGeneration,
        include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
    }]})
    if (car) {
        return car
    } else {
        return null;
    }
}

const updateCarByIdDb = async (carUpdated: CarType) => {
    const carToUpdate = db.Car.findByPk(carUpdated.id).then((car: any) => {
        return car.update(carToUpdate)
    }).then((updateResponce: any) => {

    })
}

const deleteCarByIdDb = async (carId: string) => {
    await db.Car.destroy({where: {id: carId}})
}

const findEngineByCharacteristics = async (power: string, volume: string, fuelType: string, version?: string) => {
    const engines = await db.Engine.findAll({
        where: {
            power: power.replace('KM', ''),
            fuel_type: fuelType,
            volume: volume.replace('cm3', ''),
        }
    })

    if (engines.length === 0) {
        console.log('no engine found, creating new engine');
        let engine: EngineType;
        if (version) {
            engine = {
                name: version,
                volume: Number(volume.replace('cm3', '')),
                power: Number(power.replace('KM', '')),
                fuel_type: fuelType
            }
        } else {
            engine = {
                name: power.replace('KM', '') + volume.replace('cm3', '') + fuelType,
                volume: Number(volume.replace('cm3', '')),
                power: Number(power.replace('KM', '')),
                fuel_type: fuelType
            }
        }

        const createdEngineId = await db.Engine.create({...engine})
        return createdEngineId
    }

    return engines[0];
}


const findCarName = async (brand: string, model: string, generation: string, generationStart: string, generationEnd: string) => {
    console.log(brand, model, generation, generationStart, generationEnd)
    const foundBrand = await findBrandByName(brand);
    // console.log('Found brand: ', foundBrand)
    const foundModel: CarModelType = await findModelByNameAndBrandId(foundBrand.id, model)
    // console.log('Found model ',foundModel)
    const foundGeneration: CarGenerationType = await findGenerationByModelId(foundModel.id, generationStart, generationEnd, generation)
    // console.log('Found Gen', foundGeneration)

    return foundGeneration;
}

const findBrandByName = async (name: string) => {
    const brand: Array<CarBrandType> = await db.CarBrand.findAll({
        where: {
            name
        }
    })

    if(brand.length === 0){
        const createdBrand = await db.CarBrand.create({ name })
        return createdBrand;
    }
    return brand[0]
}

const findModelByNameAndBrandId = async (brandId: string, name: string) => {
    const model = await db.CarModel.findAll({
        where: {
            name: name
        }
    })

    if (model.length === 0) {
        console.log('Could not find find model, creating new one')
        const createdModel = await db.CarModel.create({name, brand_id: brandId})
        await createdModel.save();
        return createdModel;
    }
    return model[0];
}

const findGenerationByModelId = async (modelId: string, startYear: string, endYear: string, name: string) => {
    console.log(modelId, startYear, endYear, name);
    const generation: any = await db.CarGeneration.findAll({
        where: {
            name: name.split('(')[0]
        },
        include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
    })
    console.log(generation);
    if (generation.length === 0) {
        console.log('Generation was not found, creating new one');
        let generation;
        if (endYear === '') {
            const currentYear = new Date().getFullYear().toString();
            generation = await db.CarGeneration.create({
                name: name.split('(')[0],
                start_year: startYear,
                end_year: currentYear,
                model_id: modelId
            })
        } else {
            generation = await db.CarGeneration.create({
                name: name.split('(')[0],
                start_year: startYear,
                end_year: endYear,
                model_id: modelId
            })
        }
        await generation.save();
        const generationFound: any = await db.CarGeneration.findAll({
            where: {
                name: name.split('(')[0]
            },
            include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
        })
        return generationFound[0];
    }

    console.log('Before sending', generation)
    return generation[0];
}
const getGenerationByName = async (generationName:string) => { 
    const generation = await db.CarGeneration.findAll({ where: { name: generationName }, include: [{model: db.CarModel, include: [{model: db.CarBrand}]}] })
    return generation[0];
}

const getCarLocation = async (carId:string) => {
    const car = await db.Car.findByPk(carId);
    const location = await db.Location.findByPk(car.location_id)
    return location
     

}

const createEngine = async (engine: any) => {
    await db.Engine.create({...engine})
}


module.exports = {
    getAllCarsForClient,
    getCars,
    getCarByIdDb,
    createCar,
    updateCarByIdDb,
    deleteCarByIdDb,

    createEngine,
    findEngineByCharacteristics,
    findCarName,

    getCarEquipments,
    addEquipmentsToCar,
    deleteCarEquipments,

    addCarToOrder,


    getAllCarBrands,
    findBrandByName,
    getAllModelsForBrand,
    getModelByName,
    getAllGenerationsForModel,
    getAllGenerationsForModelByName,
    getGenerationByName,


    getCarLocation

}