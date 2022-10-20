import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import carHelpers from '../services/helpers/carHelpers';
import orderHelpers from '../services/helpers/orderHelpers';

const getAllCars = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || undefined;
  const offset = Number(req.query.offset) || undefined;
  const cars = await carHelpers.getAllCars({ limit, offset });
  return res.json(cars);
};

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

export default {
  getAllCars,
  getClientCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById
};
