import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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

const createOrder = async (req: Request, res: Response) => {
  const orderBody = req.body;

  const result = await orderHelpers.createOrder(orderBody);

  return result.success
    ? res.json(result.order)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
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

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById
};
