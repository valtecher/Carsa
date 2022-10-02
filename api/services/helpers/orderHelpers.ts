import { Transaction } from 'sequelize';
import { RawOrderRecord } from '../../DTOs/rawOrderRecord';
import Logger from '../../../logger';
import db from '../../../database/models';
import userHelpers from './userHelpers';

const retrieveOrder = async (order: RawOrderRecord, isExtended: boolean): Promise<Record<string, unknown>> => {
  const selectorData = order.selector_id ? await userHelpers.getSelectorDataById(order.selector_id) : null;
  const clientData = await userHelpers.getClientDataById(order.client_id);

  const extendedOrder: Record<string, unknown> = { ...order };

  extendedOrder.CarSelector = selectorData;
  extendedOrder.Client = clientData;
  delete extendedOrder.selector_id;
  delete extendedOrder.client_id;

  if (isExtended) {
    const orderPayments = await db.Payment.findAll({
      attributes: { exclude: ['order_id'] },
      where: {
        order_id: order.id
      }
    });

    const orderConfigurations = await db.Configuration.findAll({
      where: {
        order_id: order.id
      },
      attributes: {
        exclude: ['brand_id', 'model_id', 'generation_id', 'location_id']
      },
      include: [
        { model: db.CarBrand },
        { model: db.CarModel, attributes: { exclude: ['brand_id'] } },
        { model: db.CarGeneration, attributes: { exclude: ['model_id'] } },
        { model: db.Location }
      ]
    });

    let orderCars = await db.Car_Order.findAll({
      attributes: ['car_id', 'start_reservation', 'status'],
      where: {
        order_id: order.id
      },
      raw: true
    });

    orderCars = await Promise.all(
      orderCars.map(async (car: { car_id: string; start_reservation: Date; status: string }) => {
        const carData = await db.Car.findByPk(car.car_id, {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          raw: true,
          nest: true
        });

        return {
          status: car.status,
          start_reservation: car.start_reservation,
          ...carData
        };
      })
    );

    extendedOrder.Payments = orderPayments;
    extendedOrder.Configurations = orderConfigurations;
    extendedOrder.OrderCars = orderCars;
  }

  return extendedOrder;
};

const getAllOrders = async ({ limit = Number.MAX_SAFE_INTEGER, offset = 0 }: { limit?: number; offset?: number }) => {
  const orders = await db.Order.findAll({
    limit,
    offset,
    raw: true,
    nest: true
  });

  const mappedOrders = await Promise.all(
    orders
      .filter((order: RawOrderRecord) => {
        if (order.deletedAt === null) {
          delete order.deletedAt;
        }

        return order;
      })
      .map(async (order: RawOrderRecord) => await retrieveOrder(order, false))
  );

  return mappedOrders;
};

const getOrderById = async (orderId: string) => {
  const order = await db.Order.findByPk(orderId, { raw: true, nest: true });

  if (!order) {
    return { success: false, message: `Order with provided id doesn't exist` };
  }

  const extendedOrder = await retrieveOrder(order, true);

  if (extendedOrder.deletedAt === null) {
    delete extendedOrder.deletedAt;
  }

  return { success: true, order: extendedOrder };
};

const createOrder = async (orderBody: unknown) => {
  try {
    const newOrderId = (await db.Order.create(orderBody)).id;
    const order = (await getOrderById(newOrderId)).order;

    return { success: true, order };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const updateOrderById = async (orderId: string, orderBody: unknown) => {
  try {
    const orderToUpdate = await db.Order.findByPk(orderId);

    if (!orderToUpdate) {
      return {
        success: false,
        message: "Order with provided id doesn't exist"
      };
    }

    await orderToUpdate.update(orderBody);
    const updatedOrder = (await getOrderById(orderId)).order;

    return { success: true, order: updatedOrder };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const deleteOrderById = async (orderId: string) => {
  try {
    await db.sequelize.transaction(async (transaction: Transaction) => {
      await db.Configuration.destroy(
        {
          where: {
            order_id: orderId
          }
        },
        { transaction }
      );

      await db.Order.destroy(
        {
          where: {
            id: orderId
          }
        },
        { transaction }
      );

      await db.Car_Order.update(
        { status: 'Deleted' },
        {
          where: {
            order_id: orderId
          }
        },
        { transaction }
      );
    });

    return { success: true };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const getAllOrdersForClient = async (client_id:string) => {
  const orders = await db.Order.findAll({
    include: [db.Payment],
    where: {
      client_id: client_id
    }
  });

  return orders;
}

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
  getAllOrdersForClient
};
