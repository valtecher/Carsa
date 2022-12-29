import { Transaction } from 'sequelize';
import { RawOrderRecord } from '../../DTOs/rawOrderRecord';
import Logger from '../../../logger';
import db from '../../../database/models';
import userHelpers from './userHelpers';
import { addPayment } from './paymentsHelper';
import carHelpers from './carHelpers';
import car_OrderHelper from './car_orderHelpers';
import { uuid } from '../../../client_app/src/utils/helpers/uuid';
import moment from 'moment';
import configurationHelpers from './configurationHelpers';
import sequelize from 'sequelize';

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
    const allOrderConfs = await db.Configuration.findAll();
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
        { model: db.Location },
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
          include: [db.CarBrand, db.CarModel, db.CarGeneration,   { model: db.ReportOverview, include: [ { model: db.Report, include: [ db.ReportType ] } ] }],
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
    extendedOrder.Configuration = orderConfigurations;
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
  const order = await db.Order.findByPk(orderId, { raw: true, nest: true, include: [
    {model: db.Car, as: 'car_order', include: [db.CarBrand, db.CarModel, db.CarGeneration, { model: db.ReportOverview, include: [db.Report] }]} 
  ] });

  if (!order) {
    return { success: false, message: `Order with provided id doesn't exist` };
  }

  const extendedOrder = await retrieveOrder(order, true);

  if (extendedOrder.deletedAt === null) {
    delete extendedOrder.deletedAt;
  }
  
  return { success: true, order: extendedOrder };
};

const getAllOrdersByClientId = async (clientId:string) => {
  const orders = await db.Order.findAll({
    where: {
      clientId: clientId
    }
  });

  return orders;
}

const createOrderWithCar = async (orderBody: any) => {
  try {
    const newOrderId = (await db.Order.create(orderBody.order)).id;
    const order = (await getOrderById(newOrderId)).order;
    const paymentBody = { amount: orderBody.order.sum,  order_id: newOrderId}
    const carBody = { ...orderBody?.car }

    const addedPayemnt = await addPayment({...paymentBody});
    
    const foundCar = await carHelpers.getCarByDetails(carBody);
    if(foundCar.length === 0) {
      const addedCar = await carHelpers.createCar(carBody);
      const car_order_link = car_OrderHelper.createCarOrderLink(addedCar!?.car!?.id, newOrderId)
      return { success: true, order, addedPayemnt, addedCar, car_order_link };
    } else {
      const car_order_link = car_OrderHelper.createCarOrderLink(foundCar[0]!?.id, newOrderId)
      return { success: true, order, addedPayemnt, foundCar, car_order_link };
    }
    
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const createOrderWithConfiguration = async (orderBody:any) => {
  const newOrderBody = {
    id: uuid(),
    client_id: orderBody.userId,
    status: 'Paid', 
    type: 'Configuration',
    date: moment().toISOString(),
    sum: orderBody.sum,
  }

  const newOrder = await db.Order.create(newOrderBody); 
  const paymentBody = { amount: orderBody.sum,  order_id: newOrder.id}
  const addedPayemnt = await addPayment({...paymentBody});
  let brand:any = null;
  let model:any = null;
  let generation:any = null;

  if(orderBody.configuration?.Brand){
    brand = await carHelpers.getBrandByName(orderBody.configuration?.Brand);
  }
  if(orderBody.configuration?.Model){
    model = await carHelpers.getModelByName(orderBody.configuration?.Model);
  }
  
  if(orderBody.configuration?.Generation) {
    generation = await carHelpers.getModelByName(orderBody.configuration?.Generation);
  }
   
  const configuration = await configurationHelpers.createConfiguration({...orderBody.configuration, 
    order_id: newOrder.id, 
    transmission: orderBody.configuration?.Gearbox, 
    type: orderBody.configuration?.Body_type, 
    generation_id: generation?.[0]?.id,
    model_id: model?.[0]?.id, 
    brand_id: brand?.[0]?.id 
  });

  return { success: true, order: newOrder, payment: addedPayemnt, configuration }
}

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
    include: [{ model:  db.Payment }, {model: db.Car, as: 'car_order', include: [db.CarBrand, db.CarModel, db.CarGeneration, { model: db.ReportOverview, include: [ db.Report, db.Technician ] }]} , db.Configuration],
    where: {
      client_id: client_id,
      status: {
          [sequelize.Op.not]: 'Finished'
      }
    }

  });

  return orders;
}

export default {
  getAllOrders,
  getOrderById,
  createOrderWithCar,
  createOrderWithConfiguration,
  updateOrderById,
  deleteOrderById,
  getAllOrdersForClient
};
