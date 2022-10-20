import db from '../../../database/models';
import orderHelpers from './orderHelpers';

export const getClientPaymentsHelper = async (client_id:string) => {
  const clientOrders = await orderHelpers.getAllOrdersForClient(client_id);
  const payments = clientOrders.map((order) => {
    return [...order.Payments]
  })
  return payments;
}