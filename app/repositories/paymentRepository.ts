import db from '../../database/models'
import { OrderType } from '../../types/order'
import { PaymentType } from '../../types/payment'

const getAllPayemnts = async () => {
  return await db.Payment.findAll()
}

const getAllPaymentsByOrderId = async (orderId:string) => {
  const payments = db.Payment.findAll({ include: [ { model: db.Order } ], where: { order_id: orderId } })
  return payments;
}

const getAllClientPayments =  async (clientId: string) => {
  const clientOrders = await db.Order.findAll( { include: [{ model: db.Payment, include: [ { model: db.CardPayment }, { model: db.CashPayment }, { model: db.Order } ] }],  where: { client_id: clientId } })
  console.log(clientOrders, ' orders')
  return clientOrders
  
}

const getPaymentById = async (id:string) => {
  return await db.Payemnt.findByPk(id)
}

const addPayment = (payment:any) => {

}

const updatePayment = (payment:any) => {

}

const deletePayment = (paymentId:string) => {
  db.Payment.destroy({ where: {id: paymentId}})
}

const getCardPaymentByPaymentId = async (id:string) => {
  return await db.CardPayment.findByPk(id, { include: [ db.Payment ] })
}

const getCashPaymentByPaymentId = async (id:string) => {
  return await db.CashPayment.findByPk(id, { include: [ db.Payment ] })
}

const createPayment = async ( paymentBody:any ) => {
  const paymentBodyPrepared:PaymentType = {
    date: new Date(),
    amount: paymentBody?.amount || 0,
    sum: paymentBody?.sum || 0,
    order_id: paymentBody?.order_id
  }

  const createdPayment = await db.Payment.create(paymentBodyPrepared);
  return createdPayment;

}


module.exports = {
  getAllPayemnts, 
  getPaymentById,
  getCardPaymentByPaymentId,
  getCashPaymentByPaymentId,
  getAllPaymentsByOrderId,
  getAllClientPayments,
  addPayment, 
  updatePayment,
  deletePayment,
  createPayment,

}