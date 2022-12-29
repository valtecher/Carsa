import e, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import carHelpers from '../services/helpers/carHelpers';
import employeeHelper from '../services/helpers/employeeHelper';
import orderHelpers from '../services/helpers/orderHelpers';
import { scrapOtoCar } from '../services/utils/scrapper';

const getAllBrands = async (req:Request, res:Response) => {
  res.json(await carHelpers.getAllBrands())
}

const getAllModels = async (req:Request, res:Response) => {
  const brandName = req.query.name;
  const brand = await carHelpers.getBrandByName(brandName as string || '');
  if (brand) {
    const models = await carHelpers.getAllModels(brand[0].id);
    res.json(models)
  } else {
    res.json({status: 'failed'})
  }
  
  
}

const getAllGeneratioins = async (req:Request, res:Response) => {
  const modelName = req.query.name; 
  const model = await carHelpers.getModelByName(modelName as string || '')
  const generations = await carHelpers.getAllGenerations(model[0].id || '');
  res.json(generations)
}

const getAllCars = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || undefined;
  const offset = Number(req.query.offset) || undefined;
  const cars = await carHelpers.getAllCars({ limit, offset });
  return res.json(cars);
};

const getCarsForTechnician = async (req: Request, res: Response ) => {
  const technicianId = req.params.id;
  const technician = await employeeHelper.getTechnicianById(technicianId);
  const cars = await carHelpers.getAllCarsByLocationState(technician.Location.state)
  res.json({cars: [...cars]});
}

const getClientCars = async (req:Request, res:Response) => {
  const client_id = req.params.clientId;
  const orders = await orderHelpers.getAllOrdersForClient(client_id)
  const cars = orders.map((order) => {
    if(order.car_order.length !== 0){
      return [...order.car_order];
    } else {
      return;
    }
  })

  return res.json(cars.flat(1).filter(car => car != null))
}

const getCarById = async (req: Request, res: Response) => {
  const carId = req.params.carId;

  const result = await carHelpers.getCarById(carId);
  return result.success ? res.json(result.car) : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const createCar = async (req: Request, res: Response) => {
  const carBody = req.body;
  const result = await carHelpers.createCar(carBody);
  return result.success ? res.json(result.car) : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });

};

const updateCarById = async (req: Request, res: Response) => {
  
  const carId = req.params.carId;
  const carBody = req.body;
  const result = await carHelpers.updateCarById(carId, carBody);
  
  return result.success ? res.json(result.car) : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });

};

const deleteCarById = async (req: Request, res: Response) => {
  const carId = req.params.carId;

  const result = await carHelpers.deleteCarById(carId);

  return result.success
    ? res.sendStatus(StatusCodes.OK)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const scrapCar = async (req:Request, res:Response) => {
  const scrapLink = req.query.link ;  
  const scrappedCar = await scrapOtoCar(scrapLink?.toString() || '');
  res.json(scrappedCar);
}

const buyCar = async (req:Request, res:Response) => {
  const car_id = req.params.carId; 
  await carHelpers.buyCar(car_id)
  res.json({ success: true })
}

const rejectCar = async (req:Request, res:Response) => {
  const car_id = req.params.carId;

  res.json({ success: true })
}


const getAllRejectedCars = async (req:Request, res:Response) => {
  const rejectedCars = await carHelpers.getRejectedCars();
  res.json({success: true, rejectedCars});
}

export default {
  getCarById,
  getAllCars,
  getClientCars,
  getAllRejectedCars,
  getCarsForTechnician,
  

  buyCar, 
  rejectCar,

  getAllBrands, 
  getAllModels, 
  getAllGeneratioins,

  createCar,
  updateCarById,
  deleteCarById,
  scrapCar
};
