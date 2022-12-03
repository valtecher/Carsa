import { Console } from 'console';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import carHelpers from '../services/helpers/carHelpers';
import car_orderHelpers from '../services/helpers/car_orderHelpers';
import configurationHelpers from '../services/helpers/configurationHelpers';
import orderHelpers from '../services/helpers/orderHelpers';

const getAllOrders = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || undefined;
  const offset = Number(req.query.offset) || undefined;

  const orders = await orderHelpers.getAllOrders({ limit, offset });

  return res.json(orders);
};

const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const result = await orderHelpers.getOrderById(orderId);

  return result.success
    ? res.json(result.order)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const getOrdersForClientId = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const orders = await orderHelpers.getAllOrdersForClient(clientId)
  res.json(orders);
} 

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body;

  let result:any; 
  if (orderBody.type === 'Configuration') {
    result = await orderHelpers.createOrderWithConfiguration(orderBody);
  } else {
    result = await orderHelpers.createOrderWithCar(orderBody);
  }

  

  return result?.success
    ? res.json({order: result.order, message: StatusCodes.CREATED})
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result?.message });
};

const updateOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const orderBody = req.body;

  const result = await orderHelpers.updateOrderById(orderId, orderBody);

  return result.success
    ? res.json(result.order)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const deleteOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const result = await orderHelpers.deleteOrderById(orderId);

  return result.success
    ? res.sendStatus(StatusCodes.OK)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const addCarToOrder = async (req:Request, res:Response) => {
  const body = req.body;
  const configuration = await configurationHelpers.getConfigurationById(body.configuration_id)
  const car = await carHelpers.createCar(body?.car)
  const carOrderLink = await car_orderHelpers.createCarOrderLink(car?.car.id, configuration?.configuration?.order_id);
  res.json({configuration, car, carOrderLink})
}

export default {
  getAllOrders,
  getOrdersForClientId,
  getOrderById,
  createOrder,
  addCarToOrder,
  updateOrderById,
  deleteOrderById
};
