import { Request, Response } from 'express';
import { getClientPaymentsHelper } from '../services/helpers/paymentsHelper'

const getClientPayments = async (req:Request, res:Response) => {
  const payments = await getClientPaymentsHelper(req.params.id);
  res.json({...payments.filter((payment) =>  payment.length > 0)});
}

export default {
  getClientPayments
}