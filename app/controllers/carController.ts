import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';

const jwt = require('jsonwebtoken');

const carRepository = require('../repositories/carRepository');

const getCarBrands = async ( req:Request, res:Response, next: NextFunction) => {

    const brands = await carRepository.getAllCarBrands();
    res.json(brands);

}

const getModelsForBrandByName = async (req:Request, res:Response, next:NextFunction) => {
    const brandName = req.headers.brand_name; 
    const carBrand = await carRepository.findBrandByName(brandName);
    const models = await carRepository.getAllModelsForBrand(carBrand.id)

    res.json(models);

}

const getModelsForBrand = async (req: Request, res: Response, next: NextFunction) => {
    const brandId = req.params.id
    const models = await carRepository.getAllModelsForBrand(brandId);
    res.json(models)
}

const getGenerationsForModel = async (req:Request, res:Response, next:NextFunction) => {
    const model_name = req.headers.model_name;
    const model = await carRepository.getModelByName(model_name);
    const generations = await carRepository.getAllGenerationsForModel(model.id)
    res.json(generations)

}

const addCar = async (req: Request, res: Response) => {
    const carBody = req.body
    console.log('Car body before creating', carBody)
    const newCar = await carRepository.createCar(carBody)
    return res.status(StatusCodes.CREATED).json(newCar)
}

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
    const cars = await carRepository.getCars();
    res.json(cars)
}

const getCarById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    console.log('Id get ', id)
    const car = await carRepository.getCarByIdDb(id)
    res.json(car)
}

const updateCar = async (req: Request, res: Response, next: NextFunction) => {
    const car = req.body
    console.log(car, ' recieved car')
    await carRepository.updateCarByIdDb(car)
    res.send({status: StatusCodes.OK})
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    const carId = req.params.id
    console.log("delete id: " + carId)
    await carRepository.deleteCarByIdDb(carId)
    res.send(StatusCodes.OK)
}
const getAllCarsForClient = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decoded = await jwt.decode(token?.split(' ')?.[1]);
    console.log(decoded, ' decoded')
    const cars = await carRepository.getAllCarsForClient(decoded.id)
    res.json(cars)

}

// ---------------------------- CAR EQUIPMENTS ----------------------------
const getCarEquipments = async (req: Request, res: Response) => {
    const id = req.params.id

    const carEquipments = await carRepository.getCarEquipments(id)

    return res.json(carEquipments)
}

const addEquipmentToCar = async (req: Request, res: Response) => {
    const id = req.params.id
    const equipmentsToAdd = req.body.equipments

    const [isAdded, message] = await carRepository.addEquipmentsToCar(id, equipmentsToAdd)

    return isAdded
        ? res.sendStatus(StatusCodes.CREATED)
        : res.status(StatusCodes.BAD_REQUEST).json({message})
}

const deleteCarEquipments = async (req: Request, res: Response) => {
    const id = req.params.id
    const equipmentsToAdd = req.body.equipments

    const [isDeleted, message] = await carRepository.deleteCarEquipments(id, equipmentsToAdd)

    return isDeleted
        ? res.sendStatus(StatusCodes.OK)
        : res.status(StatusCodes.BAD_REQUEST).json({message})
}
// ---------------------------- END CAR EQUIPMENTS ----------------------------

// ---------------------------- CAR ORDER ----------------------------
const addCarToOrder = async (req: Request, res: Response) => {
    const carId = req.body.car_id
    const orderId = req.body.order_id

    const order = await carRepository.addCarToOrder(carId, orderId)

    if (order === undefined)
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Car or order with provided id does not exist'})
    else if (order === null)
        return res.status(StatusCodes.CONFLICT).json({message: 'Car has already been added to order'})
    else
        return res.status(StatusCodes.CREATED).json(order)
}


export default {
    getAllCars,
    getAllCarsForClient,
    getCarById,
    createCar: addCar,
    updateCar,
    deleteById,
    getCarEquipments,
    addEquipmentToCar,
    deleteCarEquipments,
    addCarToOrder,

    getCarBrands,
    getModelsForBrand,
    getModelsForBrandByName,
    getGenerationsForModel,

}